//send attacgments with messages
const messagesattachements = require('../db/db');

const attachments = async (
    req: { body: { sender: any; receiver: any; message: any; attachment: any }; Email: string },
    res: {
        status: (arg0: number) => {
            (): any;
            new (): any;
            json: { (arg0: string): any; new (): any };
        };
    }
) => {
    try {
        const sender = req.Email;
        console.log(sender + ' is the sender')
        const { receiver, message, attachment } = req.body;

        if (!sender || !receiver || !message || !attachment) {
            return res.status(400).json('Incorrect form submission');
        }
        // Insert data into the messages table
        messagesattachements.query(
            `INSERT INTO messages (sender, receiver, message, attachment, timestamp) VALUES (?,?,?,?,NOW())`,
            [sender, receiver, message, attachment],
            (insertErr: any, insertResults: any) => {
                if (insertErr) {
                    console.log(insertErr);
                    return res.status(500).json('Database error');
                } else {
                    console.log('Data inserted into messages table');
                }
            }
        );
        res.status(200).json(JSON.stringify({ message: 'Success', sender: sender }));

    } catch (err) {
        console.log(err);
        return res.status(500).json('Server error');
    }
}
module.exports = attachments;
