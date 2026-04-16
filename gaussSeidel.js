const nEl = document.getElementById("n");
const tolEl = document.getElementById("tol");
const maxIterEl = document.getElementById("maxIter");
const entradas = document.getElementById("entradas");
const salida = document.getElementById("salida");

/* ================= ENTRADAS ================= */
function crearEntradas(){
    const n = +nEl.value;
    let html = `
    <div class="table-container">
    <table>
        <tr>
            <th></th>`;

    for(let j=0;j<n;j++) html += `<th>x${j+1}</th>`;
    html += `<th>b</th><th>x₀</th></tr>`;

    for(let i=0;i<n;i++){
        html += `<tr><th>Ecuación ${i+1}</th>`;
        for(let j=0;j<n;j++)
            html += `<td><input type="number" step="any" id="A_${i}_${j}" value="0"></td>`;
        html += `
            <td><input type="number" step="any" id="b_${i}" value="0"></td>
            <td><input type="number" step="any" id="x_${i}" value="0"></td>
        </tr>`;
    }

    html += `</table></div>`;
    entradas.innerHTML = html;
}

/* ================= RESOLVER ================= */
let f = v => v; // se redefine en resolver()
function resolver(){
    const dec = +document.getElementById("decimales").value;
f = v => Number(v).toFixed(dec);
    const n = +nEl.value;
    let A=[], b=[], x=[];

    for(let i=0;i<n;i++){
        A[i]=[];
        for(let j=0;j<n;j++)
            A[i][j] = +document.getElementById(`A_${i}_${j}`).value;
        b[i] = +document.getElementById(`b_${i}`).value;
        x[i] = +document.getElementById(`x_${i}`).value;
    }

    const Aorig = JSON.parse(JSON.stringify(A));
    const borig = [...b];

    reordenar(A,b,n);

    let tol = +tolEl.value;
    let maxIter = +maxIterEl.value;
    let xnew = [...x];
    let iter = 0, error = Infinity;
    let xHist = [];

    let html = '';
    html += matriz("Matriz original", Aorig, borig);
    html += matriz("Matriz reordenada", A, b);

    html += `<h2>Iteraciones</h2>
    <div class="table-container">
    <table>
        <tr><th>Iter</th>`;

    for(let j=0;j<n;j++) html += `<th>x${j+1}</th>`;
    html += `<th>Error</th></tr>`;

    while(error > tol && iter < maxIter){
        iter++;
        let emax = 0;

        for(let i=0;i<n;i++){
            if(A[i][i] === 0){
                salida.innerHTML = `<div class="section warning">
                Error: hay un 0 en la diagonal.
                </div>`;
                return;
            }

            let suma = b[i];
            for(let j=0;j<n;j++)
                if(i!==j) suma -= A[i][j]*xnew[j];

            let nuevo = suma / A[i][i];
            emax = Math.max(emax, Math.abs(nuevo - xnew[i]));
            xnew[i] = nuevo;
        }

        error = emax;
        xHist.push([...xnew]);

        html += `<tr><td>${iter}</td>`;
        xnew.forEach(v=> html+=`<td>${f(v)}</td>`);
        html += `<td>${error.toExponential(3)}</td></tr>`;
    }

    html += `</table></div>`;

    html += `<h2>Resultados finales</h2>`;
    xnew.forEach((v,i)=> html+=`x${i+1} = ${f(v)}<br>`);
    html += `Error final = ${error.toExponential(3)}<br>`;
    html += `Iteraciones = ${iter}<br>`;

    html += `<div class="section">
        <h2>Animación de convergencia</h2>
        <div id="grafica"></div>
    </div>`;

    salida.innerHTML = html;
    animarConvergencia(xHist);
}

/* ================= UTILIDADES ================= */
function matriz(titulo,A,b){
    let n = A.length;
    let h = `<div class="section"><h2>${titulo}</h2>
    <div class="table-container"><table><tr>`;

    for(let j=0;j<n;j++) h += `<th>x${j+1}</th>`;
    h += `<th>b</th></tr>`;

    for(let i=0;i<n;i++){
        h += `<tr>`;
        for(let j=0;j<n;j++) h += `<td>${f(A[i][j])}</td>`;
h += `<td>${f(b[i])}</td></tr>`;
    }

    return h + `</table></div></div>`;
}

function reordenar(A,b,n){
    for(let i=0;i<n;i++){
        let max = Math.abs(A[i][i]), f=i;
        for(let k=i+1;k<n;k++)
            if(Math.abs(A[k][i]) > max){
                max = Math.abs(A[k][i]);
                f = k;
            }
        if(f !== i){
            [A[i],A[f]] = [A[f],A[i]];
            [b[i],b[f]] = [b[f],b[i]];
        }
    }
}

/* ================= GRÁFICA ================= */
function animarConvergencia(xHist){
    const n = xHist[0].length;
    let data = [];

    for(let j=0;j<n;j++){
        data.push({
            x: [],
            y: [],
            mode: 'lines+markers',
            name: `x${j+1}`
        });
    }

    Plotly.newPlot("grafica", data, {
        xaxis:{title:"Iteración"},
        yaxis:{title:"Valor"},
        margin:{t:30},
        paper_bgcolor:"#122c4a",
        plot_bgcolor:"#122c4a",
        font:{color:"#eaeaea"}
    });

    let k = 0;
    const timer = setInterval(()=>{
        if(k >= xHist.length){
            clearInterval(timer);
            return;
        }
        let xvals = [], yvals = [];
        for(let j=0;j<n;j++){
            xvals.push([k+1]);
            yvals.push([xHist[k][j]]);
        }
        Plotly.extendTraces("grafica", {x:xvals,y:yvals}, [...Array(n).keys()]);
        k++;
    }, 350);
}