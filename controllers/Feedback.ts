const feedbackaxios = require('axios');

const feedback = async (req: { Email: any; body: { name: any; message: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: string): any; new(): any; }; }; }) => {
    try {
        const email = req.Email;
        const { name, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json('Incorrect form submission');
        }
     
        feedbackaxios.post('https://script.google.com/macros/s/AKfycbxSNApomb7nZyRtBxU3DJOCMghfFUqfATUUdD0yW1LUC1uabppaAUtEb8MJKna27pFx/exec', {
            name: name,
            email: email,
            feedback: message,
        })
            .then(function (response: any) {
                console.log(response);
                return res.status(200).json(JSON.stringify({ message: 'Success', name: name }));
            })
            .catch(function (error: any) {
                console.log(error);
                return res.status(500).json('Database error');
            });
    } catch (err) {
        console.log(err);
        return res.status(500).json('Server error');
    }
}
module.exports = feedback;