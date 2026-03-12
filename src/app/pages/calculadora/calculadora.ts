import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import Chart from 'chart.js/auto';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
selector:'app-calculadora',
standalone:true,
imports:[CommonModule,FormsModule],
templateUrl:'./calculadora.html',
styleUrl:'./calculadora.css'
})

export class Calculadora implements OnInit{

constructor(private http:HttpClient,private title:Title){
this.title.setTitle('CALCULADORA SSFV | SOLTIEC SAS');
}

fact1:any;
fact2:any;
fact3:any;

department='';
city='';

estrato=3;
coverage=100;

departments:any[]=[];
cities:any[]=[];

cityData:any={};
selectedCityData:any=null;

results:any=null;

roiData:any=null;

roi10=0;
paybackLabel='';

chart:any;

pricingRanges:any[]=[];

tarifasEstrato:any={
1:600,
2:700,
3:800,
4:900,
5:1000,
6:1100
};

ngOnInit(){

this.http.get<any>('assets/data/pricing.json')
.subscribe(data=>{
this.pricingRanges=data.ranges;
});

this.http.get<any>('assets/data/cities.json')
.subscribe(data=>{

this.cityData=data;

const deps=new Set<string>();

Object.values(this.cityData).forEach((item:any)=>{
deps.add(item.departamento);
});

this.departments=Array.from(deps).sort();

});

}

onDepartmentChange(){

this.cities=[];

Object.values(this.cityData).forEach((item:any)=>{

if(item.departamento===this.department){
this.cities.push(item.municipio);
}

});

}

onCityChange(){

this.selectedCityData=Object.values(this.cityData).find(
(item:any)=>
item.departamento===this.department &&
item.municipio===this.city
);

}

calculate(){

const avg=(this.fact1+this.fact2+this.fact3)/3;

const tarifa=this.tarifasEstrato[this.estrato];

const monthlyCost=avg*tarifa;

const daily=avg/30;

const hsp=this.selectedCityData?.hsp;

const systemSize=(daily/hsp)*(this.coverage/100);

const kwp=Number(systemSize.toFixed(2));

const panels=Math.ceil((kwp*1000)/550);

const investment=this.getPriceFromRange(kwp);

const roofArea=panels*2.4;

const co2=avg*12*0.164;

this.results={
systemSize:kwp,
panels,
investment,
monthlyCost,
roofArea,
co2
};

this.calculateROI(investment,monthlyCost);

}

getPriceFromRange(kwp:number){

for(let r of this.pricingRanges){

if(kwp>=r.min_kwp && kwp<r.max_kwp){
return r.price;
}

}

return 0;

}

calculateROI(investment:number,monthlyCost:number){

const annual=monthlyCost*12;

let cumulative=-investment;

const years=[];
const cumulativeData=[];
const savings=[];
const investmentBar=[];

for(let i=0;i<=20;i++){

years.push(i);

if(i===0){

cumulativeData.push(-investment);
savings.push(0);
investmentBar.push(-investment);

}else{

cumulative+=annual;

cumulativeData.push(cumulative);
savings.push(annual);
investmentBar.push(0);

}

}

const payback=cumulativeData.findIndex(v=>v>=0);

this.paybackLabel=
payback===-1?'No recupera la inversión':payback+' años';

this.roi10=cumulativeData[10];

this.roiData={
years,
cumulativeData,
savings,
investmentBar
};

setTimeout(()=>this.drawChart(),50);

}

drawChart(){

const ctx=document.getElementById('roiChart') as HTMLCanvasElement;

if(this.chart) this.chart.destroy();

this.chart=new Chart(ctx,{
data:{
labels:this.roiData.years,
datasets:[
{
type:'bar',
label:'Inversión inicial',
data:this.roiData.investmentBar,
backgroundColor:'#ef4444'
},
{
type:'bar',
label:'Ahorro anual',
data:this.roiData.savings,
backgroundColor:'#22c55e'
},
{
type:'line',
label:'Retorno acumulado',
data:this.roiData.cumulativeData,
borderColor:'#0f766e',
borderWidth:3,
tension:0.35
}
]
},
options:{
responsive:true,
maintainAspectRatio:true,
aspectRatio:2
}
});

}

/* ===== FOOTER ===== */

addFooter(pdf:any){

const pageHeight = pdf.internal.pageSize.height;
const year = new Date().getFullYear();

/* COLOR DEL TEXTO */

pdf.setTextColor(15,118,110);

pdf.setFontSize(10);

pdf.text("SOLTIEC SAS",105,pageHeight-25,{align:'center'});
pdf.text("301 892 8866-coordinador.proyectos@soltiec.co",105,pageHeight-20,{align:'center'});
pdf.text("© "+year,105,pageHeight-15,{align:'center'});

}

generatePDF(){

const pdf=new jsPDF('p','mm','a4');

const logo=new Image();
logo.src='assets/images/logo_soltiec_transparente.png';

logo.onload=()=>{

pdf.setFontSize(18);
pdf.text('Reporte Sistema Solar Fotovoltaico',105,20,{align:'center'});

pdf.setFontSize(12);

let y=40;

pdf.text(`Sistema recomendado: ${this.formatNumber(this.results.systemSize)} kWp`,20,y); y+=8;
pdf.text(`Número de paneles: ${this.results.panels}`,20,y); y+=8;
pdf.text(`Área requerida en techo: ${this.formatNumber(this.results.roofArea)} m²`,20,y); y+=8;
pdf.text(`CO2 evitado al año: ${this.formatNumber(this.results.co2)} kg`,20,y); y+=8;
pdf.text(`Inversión estimada: ${this.formatCurrency(this.results.investment)}`,20,y); y+=8;
pdf.text(`Factura mensual estimada: ${this.formatCurrency(this.results.monthlyCost)}`,20,y); y+=8;
pdf.text(`Payback estimado: ${this.paybackLabel}`,20,y); y+=8;
pdf.text(`Retorno a 10 años: ${this.formatCurrency(this.roi10)}`,20,y); y+=15;


/* ===== GRAFICA ===== */

const canvas=document.createElement('canvas');
canvas.width=1600;
canvas.height=800;

const ctx=canvas.getContext('2d');

const chart=new Chart(ctx!,{

type:'bar',

data:{
labels:this.roiData.years,
datasets:[
{
type:'bar',
label:'Inversión inicial',
data:this.roiData.investmentBar,
backgroundColor:'#ef4444'
},
{
type:'bar',
label:'Ahorro anual',
data:this.roiData.savings,
backgroundColor:'#22c55e'
},
{
type:'line',
label:'Retorno acumulado',
data:this.roiData.cumulativeData,
borderColor:'#0f766e',
borderWidth:4,
tension:0.35
}
]
},

options:{responsive:false}

});

setTimeout(()=>{

const img=canvas.toDataURL('image/png');

pdf.addImage(img,'PNG',15,y,180,90);

chart.destroy();

/* LOGO PAGINA 1 */

pdf.addImage(logo,'PNG',150,270,40,15);

/* FOOTER PAGINA 1 */

this.addFooter(pdf);


/* ===== PAGINA 2 ===== */

pdf.addPage();

pdf.setFontSize(16);
pdf.text('Retorno acumulado por año',105,20,{align:'center'});

const tableData=this.roiData.years.map((year:number,i:number)=>[
year,
this.formatCurrency(this.roiData.cumulativeData[i])
]);

autoTable(pdf,{
startY:30,
head:[['Año','Retorno acumulado']],
body:tableData,
headStyles:{fillColor:[15,118,110]},
styles:{halign:'center'}
});

/* LOGO PAGINA 2 */

pdf.addImage(logo,'PNG',150,270,40,15);

/* FOOTER PAGINA 2 */

this.addFooter(pdf);

pdf.save('reporte-sistema-solar.pdf');

},400);

};

}

formatCurrency(value:number){

return value.toLocaleString('es-CO',{
style:'currency',
currency:'COP'
});

}

formatNumber(value:number){

return value.toLocaleString('es-CO',{
minimumFractionDigits:2,
maximumFractionDigits:2
});

}

}