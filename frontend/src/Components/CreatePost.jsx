import axios from "axios";
import { useState } from "react";

const CreatePost = () => {
   
    const createBlogpost = async (values) => {
        try {
          const { titel, summary, content, author } = values
          console.log("Creating blogpost with values:", values);
            const res = await axios.post("/", 
            { firstName, lastName, email, address });
            console.log("new customer: ", res.data);
            setCustomerSaved(true);
            const customerInfo = extractCustomerInfo(res.data);
            setCustInfo(customerInfo);
            console.log("cust info", custInfo);
  
      } catch (error) {
        console.error('Error creating customer:', error);
      }
    }



    return (
        <>
            <div className="col-md-7 col-lg-8">
                <h4 className="md-3">Skriv inlägg</h4>
            </div>
            <form  
            className="needs-validation"
            onSubmit={handleSubmit}
            >
                <div className="row g-3">
                    <div className="col-sm-6">
                        <label
                        htmlFor="titel"
                        className="form-label">Titel</label>
                        <input 
                        type="text" 
                        name="titel"
                        // value={}
                        // onChange={} 
                        
                        />

                    </div>

                </div>
                

            </form>
    
        
        
        </>
    )
}

export default CreatepostPage;