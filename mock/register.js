let data = [
    {
        id: 1,
        name: '测试1',
        sex: '男',
        type: '汉族'
    },
    {
        id: 2,
        name: '测试2',
        sex: '男',
        type: '维吾尔族'
    },
    {
        id: 3,
        name: '测试3',
        sex: '女',
        type: '汉族'
    }
];


export default {
    'get /api/register/list': function (req, res, next) {
        setTimeout(() => {
            res.json({
                result: data,
            })
        }, 250)
    },

    'post /api/register/add': function (req, res, next) {
        data = [...data, {
            ...req.body,
            id: data[data.length - 1].id + 1,
        }];

        res.json({
            success: true,
        });
    },
}