export default {
    'POST /api/login/account': (req, res) => {
        const { password, userName, type } = req.body;
        if (password === '888888' && userName === 'admin') {
            res.send({
                status: 'ok',
                type,
                currentAuthority: 'admin',
            });
            return;
        }
        if (password === '123456' && userName === 'user') {
            res.send({
                status: 'ok',
                type,
                currentAuthority: 'user',
            });
            return;
        }
        res.send({
            status: 'error',
            type,
            currentAuthority: 'guest',
        });
    },
}