import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import Chart from 'chart.js/auto';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
    selector: 'app-calculadora',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './calculadora.html',
    styleUrl: './calculadora.css'
})
export class Calculadora implements OnInit {

    constructor(private http: HttpClient, private title: Title) {
        this.title.setTitle('CALCULADORA SSFV | SOLTIEC SAS');
    }

    /* =========================
       VARIABLES
    ========================== */

    fact1: any;
    fact2: any;
    fact3: any;

    department = '';
    city = '';
    estrato = 3;
    coverage = 100;

    departments: any[] = [];
    cities: any[] = [];
    cityData: any = {};
    selectedCityData: any = null;

    results: any = null;
    roiData: any = null;

    roi10 = 0;
    paybackLabel = '';

    chart: any;
    pricingRanges: any[] = [];

    tarifasEstrato: any = {
        1: 600,
        2: 700,
        3: 800,
        4: 900,
        5: 1000,
        6: 1100
    };

    /* =========================
       INIT
    ========================== */

    ngOnInit() {

        this.http.get<any>('assets/data/pricing.json')
            .subscribe(data => {
                this.pricingRanges = data.ranges;
            });

        this.http.get<any>('assets/data/cities.json')
            .subscribe(data => {

                this.cityData = data;

                const deps = new Set<string>();

                Object.values(this.cityData).forEach((item: any) => {
                    deps.add(item.departamento);
                });

                this.departments = Array.from(deps).sort();
            });
    }

    /* =========================
       UBICACIÓN
    ========================== */

    onDepartmentChange() {

        this.cities = [];

        Object.values(this.cityData).forEach((item: any) => {
            if (item.departamento === this.department) {
                this.cities.push(item.municipio);
            }
        });
    }

    onCityChange() {

        this.selectedCityData = Object.values(this.cityData).find(
            (item: any) =>
                item.departamento === this.department &&
                item.municipio === this.city
        );
    }

    /* =========================
       CÁLCULO SISTEMA
    ========================== */

    calculate() {

        const avg = (this.fact1 + this.fact2 + this.fact3) / 3;
        const tarifa = this.tarifasEstrato[this.estrato];
        const monthlyCost = avg * tarifa;

        const daily = avg / 30;
        const hsp = this.selectedCityData?.hsp;

        const systemSize = (daily / hsp) * (this.coverage / 100);

        const kwp = Number(systemSize.toFixed(2));

        const panels = Math.ceil((kwp * 1000) / 575);

        const investment = this.getPriceFromRange(kwp);

        const roofArea = panels * 2.4;

        const co2 = avg * 12 * 0.164;

        this.results = {
            systemSize: kwp,
            panels,
            investment,
            monthlyCost,
            roofArea,
            co2
        };

        this.calculateROI(investment, monthlyCost);
    }

    getPriceFromRange(kwp: number) {

        for (let r of this.pricingRanges) {
            if (kwp >= r.min_kwp && kwp < r.max_kwp) {
                return r.price;
            }
        }

        return 0;
    }

    /* =========================
       ROI
    ========================== */

    calculateROI(investment: number, monthlyCost: number) {

        const annual = monthlyCost * 12;

        let cumulative = -investment;

        const years: number[] = [];
        const cumulativeData: number[] = [];
        const savings: number[] = [];
        const investmentBar: number[] = [];

        for (let i = 0; i <= 20; i++) {

            years.push(i);

            if (i === 0) {

                cumulativeData.push(-investment);
                savings.push(0);
                investmentBar.push(-investment);

            } else {

                cumulative += annual * (0.9 ** i);

                cumulativeData.push(cumulative);
                savings.push(annual);
                investmentBar.push(0);
            }
        }

        const payback = cumulativeData.findIndex(v => v >= 0);

        this.paybackLabel =
            payback === -1 ? 'No recupera la inversión' : payback + ' años';

        this.roi10 = cumulativeData[10];

        this.roiData = {
            years,
            cumulativeData,
            savings,
            investmentBar
        };

        setTimeout(() => this.drawChart(), 50);
    }

    /* =========================
       GRÁFICA
    ========================== */

    drawChart() {

        const ctx = document.getElementById('roiChart') as HTMLCanvasElement;

        if (!ctx) return;

        if (this.chart) this.chart.destroy();

        this.chart = new Chart(ctx, {
            data: {
                labels: this.roiData.years,
                datasets: [
                    {
                        type: 'bar',
                        label: 'Inversión inicial',
                        data: this.roiData.investmentBar,
                        backgroundColor: '#EF4444'
                    },
                    {
                        type: 'bar',
                        label: 'Ahorro anual',
                        data: this.roiData.savings,
                        backgroundColor: '#22C55E'
                    },
                    {
                        type: 'line',
                        label: 'Retorno acumulado',
                        data: this.roiData.cumulativeData,
                        borderColor: '#146582',
                        borderWidth: 3,
                        tension: 0.35
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2
            }
        });
    }

    /* =========================
       GENERAR PDF
    ========================== */

generatePDF() {

const pdf = new jsPDF('p','mm','a4');

const logo = new Image();
logo.src = 'assets/images/logo_soltiec_transparente.png';

const firma = new Image();
firma.src = 'assets/images/firma-correo-santiago-ramirez.png';

const pageWidth = pdf.internal.pageSize.width;
const pageHeight = pdf.internal.pageSize.height;

const today = new Date();
const day = today.getDate();
const yearShort = today.getFullYear().toString().slice(-2);
const yearFull = today.getFullYear();

const months = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
const month = months[today.getMonth()];
const formattedDate = `${day}-${month}-${yearShort}`;

const imgWidth = 40;
const imgHeight = imgWidth / 3.34;
const headerY = 16;

/* HEADER */

const drawHeader = () => {

pdf.addImage(logo,'PNG',15,headerY-imgHeight/2,imgWidth,imgHeight);

pdf.setFont('helvetica','bold');
pdf.setFontSize(10);
pdf.setTextColor(20,101,130);

pdf.text(`Fecha: ${formattedDate}`,pageWidth-15,headerY,{align:'right'});

pdf.setDrawColor(200,200,200);
pdf.line(15,30,pageWidth-15,30);

};

/* FOOTER */

const drawFooter = () => {

pdf.setDrawColor(200,200,200);
pdf.line(15,pageHeight-30,pageWidth-15,pageHeight-30);

pdf.setFont('helvetica','bold');
pdf.setFontSize(10);
pdf.setTextColor(20,101,130);
pdf.text('SOLTIEC SAS',pageWidth/2,pageHeight-22,{align:'center'});

pdf.setFont('helvetica','normal');
pdf.text('301 892 8866 · coordinador.proyectos@soltiec.co',pageWidth/2,pageHeight-17,{align:'center'});
pdf.text(`© ${yearFull}`,pageWidth/2,pageHeight-12,{align:'center'});

};

/* FILA */

const drawRow = (label:string,value:string,y:number) => {

pdf.setFont('helvetica','bold');
pdf.text(label,20,y);

pdf.setFont('helvetica','normal');
pdf.text(value,85,y);

};

logo.onload = () => {

/* ========================= */
/* PAGINA 1 */
/* ========================= */

drawHeader();

pdf.setFont('helvetica','bold');
pdf.setFontSize(18);
pdf.setTextColor(20,101,130);
pdf.text('Reporte Sistema Solar Fotovoltaico',105,45,{align:'center'});

pdf.setFontSize(12);
pdf.setTextColor(0,0,0);

let y = 65;

drawRow('Departamento:', this.department || '-', y); y+=8;
drawRow('Ciudad:', this.city || '-', y); y+=8;
drawRow('Horas sol pico (HSP):', `${this.formatNumber(this.selectedCityData?.hsp || 0)} h`, y); y+=8;

pdf.setDrawColor(220,220,220);
pdf.line(20,y,190,y);
y+=6;

drawRow('Potencia a instalar:',`${this.formatNumber(this.results.systemSize)} kWp`,y); y+=8;
drawRow('Cantidad de paneles:',`${this.results.panels}`,y); y+=8;
drawRow('Área requerida en techo:',`${this.formatNumber(this.results.roofArea)} m²`,y); y+=8;
drawRow('CO2 evitado al año:',`${this.formatNumber(this.results.co2)} kg`,y); y+=8;
drawRow('Inversión inicial:',`${this.formatCurrency(this.results.investment)}`,y); y+=8;
drawRow('Factura mensual estimada:',`${this.formatCurrency(this.results.monthlyCost)}`,y); y+=8;
drawRow('Payback estimado:',`${this.paybackLabel}`,y); y+=8;
drawRow('Retorno acumulado 10 años:',`${this.formatCurrency(this.roi10)}`,y); y+=12;

/* GRAFICA */

const canvas = document.createElement('canvas');
canvas.width = 1600;
canvas.height = 800;

const ctx = canvas.getContext('2d');

const chart = new Chart(ctx!,{
type:'bar',
data:{
labels:this.roiData.years,
datasets:[
{type:'bar',label:'Inversión inicial',data:this.roiData.investmentBar,backgroundColor:'#EF4444'},
{type:'bar',label:'Ahorro anual',data:this.roiData.savings,backgroundColor:'#22C55E'},
{type:'line',label:'Retorno acumulado',data:this.roiData.cumulativeData,borderColor:'#146582',borderWidth:4,tension:0.35}
]
},
options:{responsive:false}
});

setTimeout(()=>{

const img = canvas.toDataURL('image/png');
pdf.addImage(img,'PNG',15,y,180,90);

chart.destroy();

drawFooter();

/* ========================= */
/* PAGINA 2 */
/* ========================= */

pdf.addPage();
drawHeader();

pdf.setFont('helvetica','bold');
pdf.setFontSize(18);
pdf.setTextColor(20,101,130);
pdf.text('Retorno acumulado por año',105,45,{align:'center'});

const tableData = this.roiData.years.map((year:number,i:number)=>[
year,
this.formatCurrency(this.roiData.cumulativeData[i])
]);

autoTable(pdf,{
startY:60,
head:[['Año','Retorno acumulado']],
body:tableData,
headStyles:{fillColor:[20,101,130],textColor:[255,255,255]},
bodyStyles:{textColor:[20,101,130]},
styles:{halign:'center'}
});

drawFooter();

/* ========================= */
/* PAGINA 3 */
/* ========================= */

pdf.addPage();
drawHeader();

pdf.setFont('helvetica','bold');
pdf.setFontSize(18);
pdf.setTextColor(20,101,130);
pdf.text('Condiciones del proyecto',105,45,{align:'center'});

pdf.setFont('helvetica','normal');
pdf.setFontSize(12);
pdf.setTextColor(0,0,0);

const condiciones = [
"Los valores presentados en este documento corresponden a una estimación preliminar basada en la información suministrada.",
"El valor final del proyecto puede variar una vez se realice un análisis técnico detallado del sitio de instalación.",
"Cada sistema fotovoltaico requiere evaluación de condiciones estructurales, ubicación exacta, orientación e inclinación del sistema, así como revisión del sistema eléctrico existente.",
"Para definir el alcance definitivo del proyecto es necesario realizar una visita técnica, levantar información en campo y desarrollar la ingeniería de detalle correspondiente.",
"Posteriormente se elabora la propuesta técnica y económica final con el diseño definitivo del sistema y las condiciones completas de instalación."
];

let yCond = 60;

condiciones.forEach(item => {

const lines = pdf.splitTextToSize(item,160);

pdf.text("•",20,yCond);

pdf.text(lines,25,yCond,{maxWidth:160,align:'justify'});

yCond += lines.length * 6 + 4;

});

/* FIRMA */

const firmaWidth = 120;
const firmaHeight = firmaWidth / 4.21;

pdf.addImage(firma,'PNG',(pageWidth-firmaWidth)/2,pageHeight-90,firmaWidth,firmaHeight);

drawFooter();

pdf.save('reporte-sistema-solar.pdf');

},400);

};

}
    /* =========================
       FORMATOS
    ========================== */

    formatCurrency(value: number) {

        return value.toLocaleString('es-CO', {
            style: 'currency',
            currency: 'COP'
        });
    }

    formatNumber(value: number) {

        return value.toLocaleString('es-CO', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
}