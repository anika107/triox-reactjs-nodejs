import React, {Component} from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';


function Application() {
    const [all, setall] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:5000/product")
        .then(res => setall(res.data))
        .catch(error => console.log(error))
    })
    
    const [cnt, setcnt] = useState({
        ins: 0,
        val: "",
        total_ins_char: 0,
        exchange_rate: "",
        product_id: "",
        av: 0,
        cd: "",
        cd_per: 0,
        rd: "",
        rd_per: 0,
        sd: "",
        sd_per: 0,
        vat: "",
        vat_per: 0,
        total: 0
    });
    
    var { ins, val, total_ins_char, exchange_rate, av, cd, cd_per,
        rd, rd_per, sd, sd_per, vat, vat_per, total, product_id} = cnt;
    
    const on_change_value = e => { 

        var new_value = parseInt(e.target.value)
        var new_ins = new_value * 0.01
        var new_total_ins_char = new_value + 2*new_ins
        var new_av = exchange_rate * new_total_ins_char
        var new_cd_per = new_av * cd/100
        var new_rd_per = new_av * rd/100
        var new_sd_per = (new_av + new_cd_per + new_rd_per) * sd/100
        var new_vat_per = (new_av + new_cd_per + new_rd_per + new_sd_per) * vat/100
        var new_total = new_av + new_cd_per + new_rd_per + new_sd_per + new_vat_per

        setcnt({
            ...cnt,
            ins: new_ins,
            val: new_value,
            total_ins_char: new_total_ins_char,
            av: new_av,
            cd_per: new_cd_per,
            rd: new_rd_per,
            sd: new_sd_per,
            vat_per: new_vat_per,
            total: new_total
        })
    }

    const on_change_exchange_rate = e => {

        var new_exchange_rate = parseInt(e.target.value)
        var new_av = new_exchange_rate * total_ins_char
        var new_cd_per = new_av * cd/100
        var new_rd_per = new_av * rd/100
        var new_sd_per = (new_av + new_cd_per + new_rd_per) * sd/100
        var new_vat_per = (new_av+ new_cd_per + new_rd_per + new_sd_per) * vat/100
        var new_total = new_av + new_cd_per + new_rd_per + new_sd_per + new_vat_per

        setcnt({
            ...cnt,
            exchange_rate: new_exchange_rate,
            av: new_av,
            cd_per: new_cd_per,
            rd_per: new_rd_per,
            sd_per: new_sd_per,
            vat_per: new_vat_per,
            total: new_total
        })
    }

    const on_change_product_id = e => {

        var new_product_id = e.target.value
        for(var i = 0; i < all.length; i ++){
            console.log(all[i]["Product ID"], new_product_id)
            if(all[i]["Product ID"] === new_product_id){ 
                var new_cd = all[i].CD
                var new_cd_per = av * all[i].CD/100
                var new_rd = all[i].RD
                var new_rd_per = av * all[i].RD/100
                var new_sd = all[i].SD
                var new_sd_per = (av + new_cd_per + new_rd_per) * all[i].SD/100
                var new_vat = all[i].VAT
                var new_vat_per = (av + new_cd_per + new_rd_per + new_sd_per) * vat/100
                var new_total = av + new_cd_per + new_rd_per + new_sd_per + new_vat_per

                setcnt({
                    ...cnt,
                    product_id: new_product_id,
                    cd: new_cd,
                    cd_per: new_cd_per,
                    rd: new_rd, 
                    rd_per: new_rd_per,
                    sd: new_sd,
                    sd_per: new_sd_per,
                    vat: new_vat,
                    vat_per: new_vat_per,
                    total: new_total
                 })
            }
            else{
                setcnt({
                    ...cnt,
                    product_id: new_product_id,
                    cd: "",
                    rd: "",
                    sd: "",
                    vat: ""
                })
            }
        }
    }
    
    const on_change_cd = e => {
        var new_cd = parseInt(e.target.value)
        var new_cd_per = av * new_cd/100
        var new_sd_per = (av + new_cd_per + rd_per) * sd/100
        var new_vat_per = (av + new_cd_per + rd_per + new_sd_per) * vat/100
        var new_total = av + new_cd_per + rd_per + new_sd_per + new_vat_per
        setcnt({
            ...cnt,
            cd: new_cd,
            cd_per: new_cd_per,
            sd_per: new_sd_per,
            vat_per: new_vat_per,
            total: new_total
        })
    }

    const on_change_rd = e => {
        var new_rd = parseInt(e.target.value)
        var new_rd_per = av * new_rd/100
        var new_sd_per = (av + cd_per + new_rd_per) * sd/100
        var new_vat_per = (av + cd_per + new_rd_per + new_sd_per) * vat/100
        var new_total = av + cd_per + new_rd_per + new_sd_per + new_vat_per
        setcnt({
            ...cnt,
            rd: new_rd,
            rd_per: new_rd_per,
            sd_per: new_sd_per,
            vat_per: new_vat_per,
            total: new_total
        })
    }

    const on_change_sd = e => {
        var new_sd = parseInt(e.target.value)
        var new_sd_per = (av + cd_per + rd_per) * new_sd/100
        var new_vat_per = (av + cd_per + rd_per + new_sd_per) * vat/100
        var new_total = av + cd_per + rd_per + new_sd_per + new_vat_per
        setcnt({
            ...cnt,
            sd: new_sd,
            sd_per: new_sd_per,
            vat_per: new_vat_per,
            total: new_total
        })
    }

    const on_change_vat = e => {
        var new_vat = parseInt(e.target.value)
        var new_vat_per = (av + cd_per + rd_per + sd_per) * new_vat/100
        var new_total = av + cd_per + rd_per + sd_per + new_vat_per
        setcnt({
            ...cnt,
            vat: new_vat,
            vat_per: new_vat_per,
            total: new_total
        })
    }
    
    const css = `
        .box {
            width: 100px;
            padding: 5px;
            border: solid black;
            margin-left:30px;
        }
        .av-box{
            width: 100px;
            padding: 5px;
            border: solid black;
            margin-left:210px;
        }
        `
        return(
        <div> 
           <br></br>
           <label>Value:</label>
           <input type="number" value={val} onChange={on_change_value} />

           <label>Exchange Rate:</label>
           <input type="number" value={exchange_rate} onChange={on_change_exchange_rate} />

           <label>Product ID:</label>
           <input type="text" value={product_id} onChange={on_change_product_id} />
           <br></br><br></br>
              
           <h3>Insurance 1% &nbsp; {ins} &nbsp; USD</h3>
           <h3>Charge 1% &nbsp; {ins} &nbsp;USD</h3>
           <h3>Total Value &nbsp; {total_ins_char} &nbsp; USD</h3>
           <br></br><br></br><br></br>
           <div>
               A/V  
               <span class="av-box"> <style>{css}</style> {av} TK </span>
           </div>
           <br></br><br></br>
           <div>
               CD
               <input type="number" value={cd} onChange={on_change_cd} />
               <span class="box"> 
               <style>{css}</style>
                   {cd_per} TK
                </span>
           </div>
           <br></br><br></br>
           <div>
               RD
               <input type="number" value={rd} onChange={on_change_rd} />
               <span class="box"> 
               <style>{css}</style>
                   {rd_per} TK
                </span>
           </div>
           <br></br><br></br>
           <div>
               SD
               <input type="number" value={sd} onChange={on_change_sd} />
               <span class="box"> 
               <style>{css}</style>
                   {sd_per} TK
                </span>
           </div>
           <br></br><br></br>
           <div>
               VAT
               <input type="number" value={vat} onChange={on_change_vat} />
               <span class="box"> 
               <style>{css}</style>
                   {vat_per} TK
                </span>
           </div>
           <br></br><br></br>
           <h3>Total &nbsp;&nbsp;&nbsp; {total} &nbsp; TK</h3>
        </div>
        
       );
    
}

export default Application;