import React from "react";
export default function Checkbox({Product ,SetProduct}) {

    const handleChange = (event) => {
         
        var value = event.target.value;
        SetProduct({
            ...Product, [event.target.name]: value
        });
        console.log(event.target)


    }

    let checked = Product.Stock === "In Stock" ? true : false;
    let checked1 = Product.Stock === "Out of Stock" ? true : false;

    return (
       <div>
         <div className='col-12   '>
            <label className=''>
                Stock:
            </label>
        </div>
        <div className='col-12  product_Col center checkbox_product'>
        <div className="form-check">
            <label className="form-check-label" htmlFor="flexRadioDefault1">
            <input className="form-check-input" type="radio" name="Stock" value={"In Stock"} onChange={handleChange} id="flexRadioDefault1" checked={checked} />
                In Stock
            </label>
        </div>
        <div className="form-check">
            <input className="form-check-input" type="radio" name="Stock" value={"Out of Stock"} onChange={handleChange} id="flexRadioDefault2" checked={checked1} />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
                Out of Stock
            </label>
        </div>
    </div>
       </div>
    )
}