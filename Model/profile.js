const { Schema, model}=require('mongoose');
// const Schema=mongoose.Schema();

let ProfileSchema=new Schema(
    {
    photo:{
        type:[" "],
    },
    firstname:{
        type:"string",
        required:true,
    },
    lastname:{
        type:"string",
        required:true,
    },
    designation:{
        type:"string",
        required:true,
    },
    phone:{
        type:"string",
        required:true,
    },
    gender: {
        type: "String",
        required: true,
        enum: ["male", "female"],
      },
    address:{
        type:"string",
        required:true,
    },
    alt_address:{
        type:"string",
    },
    country:{
        type:"string",
        required:true,
    },
    state:{
        type:"string",
        required:true,
    }, 
    city:{
        type:"string",
        required:true,
    }, 
    pincode:{
        type:"string",
        required:true,
    }, 
    landmark:{
        type:"string",
        required:true,
    }, 
     
},
{ timestamps: true }
)
module.exports=model("profiles",ProfileSchema);