module.exports={
    css:{
        loaderOptions:{
            less:{
                javascriptEnabled:true
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production'
    ? '/everyfresh/'
    : '/'
}