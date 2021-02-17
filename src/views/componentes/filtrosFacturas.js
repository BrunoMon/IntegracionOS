/** @format */

import { html, LitElement, css } from "lit-element";
import { gridLayout } from "../css/gridLayout";
import { button } from "../css/button";
import { toggle } from "../css/toggle";
import { input } from "../css/input";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { isInLayout } from "../../redux/screens/screenLayouts";
import {select } from "../css/select"
import {prestadoresComponent} from "./prestadores"
import { get as getFacturas } from "../../redux/facturasPrestadores/actions";

import { SEARCH } from "../../../assets/icons/svgs";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const COMPROBANTES = "tipoComprobantes.timeStamp"
const PERIODOS = "periodosMensuales.listaTimeStamp"
const PERIODOSMES = "periodosMensuales.timeStamp"
const ESTADOS = "facturasPrestadoresEstados.timeStamp";

export class filtrosFacturas extends connect(store,  MEDIA_CHANGE, SCREEN, PERIODOS, PERIODOSMES ,COMPROBANTES, ESTADOS)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.tipoComprobantes=[]
        this.periodos =[]
        this.estados =[]
        this.periodoActual = null
        
    }
    static get styles() {
        return css`
            ${gridLayout}
            ${button}
            ${toggle}
            ${input}
            ${select}

            :host {
                display: grid;
                grid-auto-flow: row;
                align-content: start;
                overflow-y: auto;
                width: 98vw;
                padding: 1vw;
            }

            :host([hidden]) {
                display: none;
            }

            h1,
            h2,
            h3,
            h4 {
                margin: 0;
            }

            .oculto {
                display: none !important;
            }

            .tarjeta {
                padding: 0.5rem;
                background-color: white;
                box-shadow: var(--shadow-elevation-2-box);
            }
            .sublabel {
                color: var(--color-azul-oscuro);
                font-size: 0.8rem;
            }
            .primaryColor {
                color: var(--primary-color);
            }
            .primaryColorInvert {
                color: white;
                background-color: var(--primary-color);
                padding: 0.3rem;
                border-radius: 4px;
            }
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        `;
    }
    render() {
        
            return html`                   
                <div class="grid row " style="padding:0">
                    <div class="grid column  start">
                        <div class="input fit">
                            <label>Orden</label>
                            <input type="number" id="orden" autocomplete="off" maxlength="8" @input=${this.maxLength} />    
                        </div>         
                        <div class="input fit">
                            <label>DNI</label>
                            <input type="number" id="hiscli" autocomplete="off" maxlength="8" @input=${this.maxLength} />    
                        </div>    
                        <div class="input fit">
                            <label>Expte</label>
                            <input type="number" id="expediente" autocomplete="off" maxlength="8" @input=${this.maxLength} />    
                        </div>                        
                        <div class="select">
                            <label>Período</label>
                            <select id="periodo" >
                            <option value=-1>Cualquier Período</option>
                                ${this.periodos.map((c) => {
                                    return html`<option ?selected="${this.periodoActual==c}"  value="${c}">${c}</option>`;
                                })}
                            </select>
                        </div>
                        <prestadores-component id="prestador"></prestadores-component>
                    </div>


                    <div class="grid column start ">
                        <div class="select">
                            <label>Tipo</label>
                            <select id="tipo" >
                                <option value="-1" selected>Todos</option>
                                ${this.tipoComprobantes.map((c) => {
                                    return html`<option  value="${c.Id}">${c.Nombre}</option>`;
                                })}
                            </select>
                        </div>
                        <div class="input fit">
                            <label>Punto de venta</label>
                            <input type="number" id="sucursal" autocomplete="off" maxlength="4" @input=${this.maxLength} />
                        </div>
                        <div class="input fit">
                            <label>Número</label>
                            <input type="number" id="numero" autocomplete="off" maxlength="8" @input=${this.maxLength} />
                        </div>
                        <div class="select">
                            <label>Estados</label>
                            <select id="estados" ?disabled=${this.estado!=0 && this.estado!=-1} >
                                <option value="-1">Todos</option>
                                ${this.estados.map((c) => {
                                    return html`<option  value="${c.Id}" ?selected=${c.Id==this.estado}>${c.Descripcion}</option>`;
                                })}
                            </select>
                        </div>
                        <button btn3 @click="${this.limpiar}">Limpiar Filtros</button>
                        <button btn1 @click="${this.buscar}">Buscar</button>
                    </div>
                </div>              
            `;

    }

    limpiar(){
        let orden = this.shadowRoot.querySelector("#orden")
        let expediente = this.shadowRoot.querySelector("#expediente")
        let hiscli = this.shadowRoot.querySelector("#hiscli")
        let periodo = this.shadowRoot.querySelector("#periodo")
        let tipo = this.shadowRoot.querySelector("#tipo")
        let sucursal = this.shadowRoot.querySelector("#sucursal")
        let numero = this.shadowRoot.querySelector("#numero")

        orden.value=""
        hiscli.value=""
        expediente.value = ""
        periodo.value=-1
        tipo.value = -1
        sucursal.value = ""
        numero.value=""
        this.update()
        
    }
    buscar(e){
        const orden = this.shadowRoot.querySelector("#orden").value
        const periodo = this.shadowRoot.querySelector("#periodo").value
        const expediente = this.shadowRoot.querySelector("#expediente").value
        const prestador = this.shadowRoot.querySelector("#prestador")
        const tipo = this.shadowRoot.querySelector("#tipo").value
        const sucursal = this.shadowRoot.querySelector("#sucursal").value
        const numero = this.shadowRoot.querySelector("#numero").value
        const estados = this.shadowRoot.querySelector("#estados").value
        let filtro = ""
        

        if (periodo!=-1){
             filtro+= "Expediente_Bono/Periodo eq " + periodo + " and "
        }

        if (orden!=0 && orden!=""){
            filtro+="Expediente_Bono/Id eq " + orden + " and "
        }
        
        if (expediente!=0 && expediente!=""){
            	filtro+="Expediente_Bono/Expediente eq " + expediente + " and "
        }

        if (prestador.value && prestador.value!=""){
            filtro+= "IdPrestador eq "+ prestador.value + " and "
        }
        
        if (tipo!=-1){
            filtro+=IdTipoComprobante + " and "
        }

        if (sucursal!=0){
            filtro+="PuntoVenta eq " + sucursal + " and "
        }

        if (numero!=0){
            filtro+=" NroComprobante eq " + numero + " and "
        }

        if (estados!=-1){
            filtro+= " IdFacturasPrestadoresEstado eq " + estados + " and "
        }

        filtro = filtro.slice(0,-5)
        
        store.dispatch(getFacturas({
            expand: "prestado,SSS_TipoComprobantes,FacturasPrestadoresImagenes($expand=Documentacion),FacturasPrestadoresEstados,Expediente_Bono($expand=Cabecera($expand=Detalle($expand=SSS_Prestaciones)))",
            filter: filtro , 
            orderby: "NroComprobante desc"}))          
    }
    

    maxLength(e) {
        const valor = e.currentTarget;
        const largo = valor.getAttribute("maxlength");
        if (valor.value.length > largo) {
            valor.value = valor.value.slice(0, largo);
        }
    }

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.update();
        }
        if (name == SCREEN) {
            this.hidden = true;
            const isCurrentScreen = ["aprobacionFacturas"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
               const estados = this.shadowRoot.querySelector("#estados")
               

            }
            this.update();
        }

        
        if (name == ESTADOS){
            this.estados = state.facturasPrestadoresEstados.entities
      
            this.update()
        }


        if (name == COMPROBANTES) {
            this.tipoComprobantes = state.tipoComprobantes.entities;
            this.update();
        }
        
        if (name==PERIODOS){
            this.periodos = state.periodosMensuales.entities;
            this.update()
        }
        if (name==PERIODOSMES){
            this.periodoActual = state.periodosMensuales.periodoMensualActual,
            this.update()
        }
    }

 

    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: "media-size",
            },
            layout: {
                type: String,
                reflect: true,
            },
            hidden: {
                type: Boolean,
                reflect: true,
            },
            area: {
                type: String,
            },
            estado:{
                type: Number,
                reflect: true,
                value: 0,

            }
        };
    }
}
window.customElements.define("filtros-facturas", filtrosFacturas);