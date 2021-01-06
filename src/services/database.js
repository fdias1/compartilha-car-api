const mongoose = require('mongoose')
const mongodbURI = process.env.MONGODB_CONN_STRING

mongoose.connect(mongodbURI,{ 
    useNewUrlParser: true,  
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false },
    err => err ? console.log('error:',err) : console.log('Database Connected')
)
