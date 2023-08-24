const cron = require('node-cron');
const webhookaxios = require('axios');
const croncontroller  =async  (req:any,res:any) => {
    
    try {
     
       const data = req.body.data;
    
         cron.schedule('*/10 * * * * *',() => {
            console.log('running a task every 10 seconds');
            const webhookurl = 'https://discord.com/api/webhooks/1144217001305325628/yQwbmddtcfFBNUBQsNjUd2rzYwPM5jnPoQ-Zd3K4AYdLM9ZMs-SU6qbYj0vQXx0MkXCK';
          const postmessage=  webhookaxios.post(webhookurl, {
                content: data+" "+new Date()
            })
                .then((res: any) => {
                    console.log(`statusCode: ${res.statusCode}`)
                    console.log(res)
                })
                .catch((error: any) => {
                    console.error(error)
                })
                console.log(postmessage)

            });
           
            res.status(200).json('Success');

    } catch (error) {
        console.log(error);
    }
}
module.exports = croncontroller;