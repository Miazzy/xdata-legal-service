/**
 * @description 邮件配置
 */
export const mailconfig = {
    '杨高春': 'yanggc@leading-group.cn',
    '陈乐丽': 'chenll@leading-group.cn',
    '周贤磊': 'zhou_32@qq.com',
    '陈雅兰': 'chenyl0929@leading-group.cn',
    '周雪丽': 'zhouxueli@leading-group.cn',
};

/**
 * @description 账户配置
 */
export const config = {
    '杨高春': 'yanggc',
    '陈乐丽': 'chenll',
    '周贤磊': 'zhouxl0121',
    '陈雅兰': 'chenyl0929',
    '周雪丽': 'zhouxl0627',
}

/**
 * @description 系统配置信息
 */
export const system = {
    config: {
        regexp: {
            mail: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
            mobile: '',
        }
    }
}

/**
 * @description 工作组配置
 */
export const group = {
    Group_LD: {
        seal: 'yanggc,chenll,zhouxl0121,zhaozy1028',
        front: 'zhouxl0627,zhaozy1028',
        archive: 'chenyl0929,zhaozy1028',
        prefix: 'LD',
        name: 'Group_LD',
    },
    ENTRY_JOB: {
        GROUP0: {
            JOB_HR_ADMIN: 'zhaozy1028,guojy0508,tangjw1227,zhengm1105',
            JOB_EXEC_ADMIN: 'yanggc,chenll',
            JOB_MEAL_ADMIN: 'longjing',
            JOB_FRONT_ADMIN: 'shur0411,zhouxl0627,wuzy0518,haoqw0515,chenal0625,zhaozy1028',
        }
    },
}

/**
 * @description 行政管理用印状态类型
 */
export const statusType = {
    'none': '待用印',
    'seal': '已用印',
    'receive': '已领取',
    'sending': '已寄送', //我方先用印，则已用印后，将合同寄给对方
    'getback': '已寄回', //收到对方盖章后的合同后，接收人，将合同设置为已返回
    'front': '移交前台',
    'archive': '归档完成',
    'done': '已归档',
}

/**
 * @description 合同类别对应编号名称
 */
export const sealTypeNoName = {
    '合同类': '合同编号',
    '非合同类': '流水编号',
}

/**
 * @description 下拉组件选择类型
 */
export const compcolumns = {
    commonTypeColumns: ['是', '否'],
    archiveTypeColumns: ['财务归档', '档案归档'],
    orderTypeColumns: ['我方先印', '常规用印'],
    sealTypeColumns: ['合同类', '非合同类'],
    sealStatusColumns: ['待用印', '已用印', '已领取', '已寄送', '移交前台', '档案归档', '财务归档', '已退回', '已作废'],
    diplomaTypeColumns: ['博士', '硕士', '本科', '专科', '高中', '初中', '小学'],
    acceptType: ['*/*'],
    approveColumns: ['OA系统', 'ERP系统', '费控系统', '创达OA系统', 'CRM系统', 'EHR系统', '资金系统', '领地HR', '宝瑞商管'],
}

/**
 * @description 物品领用管理
 */
export const goodstype = {
    'office': '办公用品',
    'drug': '药品',
    'prevent': '防疫物资',
    '办公用品': 'office',
    '药品': 'drug',
    '防疫物资': 'prevent',
};

/**
 * @description 物品借用管理
 */
export const goodsborrowtype = {
    'common': '信息设备',
    'box': '传屏设备',
};

/**
 * @description 物品借用管理
 */
export const rewardtype = {
    '0': '业绩考核奖',
    '1': '总裁专项奖',
    '2': '总经理专项奖',
    '3': '特殊贡献奖',
    '4': '其他诉讼案件',
};

/**
 * @description 诉讼案件界面默认配置
 */
export const reward = ($router) => {
    return [{
        id: 'task-pane',
        title: '任务面板',
        taskflows: [{
            name: "我的知会",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/xdata-stock-service@v1.0.5/src/assets/img/liebiao_jy.png`,
            href: "/account/myrewardlist",
            description: '查看我的案件知会信息',
            click: () => {
                $router.push(`/legal/message?panename=myrewardlist&type=7&back=/legal/workspace`, '_blank');
            },
        }, {
            name: "我的待办",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/time_00.png`,
            href: "/account/todolist",
            description: '查看待处理的案件审批流程',
            click: () => {
                $router.push(`/legal/message?panename=mytodolist&type=7&back=/legal/workspace`, '_blank');
            }
        }, {
            name: "我的已办",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/home_00.png`,
            href: "/account/donelist",
            description: '查看已处理的案件审批流程',
            click: () => {
                $router.push(`/legal/message?panename=mydonelist&type=7&back=/legal/workspace`, '_blank');
            }
        }, {
            name: "我的申请",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/hire.png`,
            href: "/account/donelist",
            description: '查看我发起的案件审批流程',
            click: () => {
                $router.push(`/legal/message?panename=myapplylist&type=7&back=/legal/workspace`, '_blank');
            }
        }],
    }, {
        id: 'task-pane',
        title: '案件管控',
        taskflows: [{
            name: "起诉案件发起",
            avatar: `https://cdn.jsdelivr.net/gh/Miazzy/xdata-stock-service@v1.0.5/src/assets/img/qiandao_jy.png`,
            href: "/account/todolist",
            description: '公司主动起诉案件发起申请',
            click: () => {
                $router.push(`/legal/legalapply?type=0&legalTname=起诉`, '_blank');
            }
        }, {
            name: "应诉案件发起",
            avatar: `https://cdn.jsdelivr.net/gh/Miazzy/xdata-stock-service@v1.0.5/src/assets/img/qiandaohuizong_jy.png`,
            href: "/account/donelist",
            description: '公司应诉案件发起申请',
            click: () => {
                $router.push(`/legal/legalapply?type=1&legalTname=应诉`, '_blank');
            }
        }, {
            name: "案件管理",
            avatar: `https://cdn.jsdelivr.net/gh/Miazzy/xdata-stock-service@v1.0.5/src/assets/img/yanglaodaiyuzigerenzheng.png`,
            href: "/account/donelist",
            description: '查看/管理案件列表信息',
            click: () => {
                $router.push(`/legal/legallist?type=99&&status=all&legalTname=all`, '_blank');
            }
        }, {
            name: "结案记录",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/shenpi.png`,
            href: "/account/myanalyse",
            description: '查看已结案案件列表信息',
            click: () => {
                $router.push(`/legal/lawsuitlist?&type=99&status=finish&legalTname=all`, '_blank');
            },
        }, {
            name: "一审管理",
            avatar: `https://cdn.jsdelivr.net/gh/Miazzy/xdata-stock-service@v1.0.5/src/assets/img/fenbufenxiang_jy.png`,
            href: "/account/myrewards",
            description: '对案件进展处于一审阶段的案件进行管理',
            click: () => {
                // $router.push(`/legal/legalapply?type=3&reward_name=特殊贡献`, '_blank');
            },
        }, {
            name: "二审管理",
            avatar: `https://cdn.jsdelivr.net/gh/Miazzy/xdata-stock-service@v1.0.5/src/assets/img/laodongnenglijianding.png`,
            href: "/account/myanalyse",
            description: '对案件进展处于二审阶段的案件进行管理',
            click: () => {
                // $router.push(`/legal/legalapply?type=4&reward_name=其他诉讼案件`, '_blank');
            },
        }, {
            name: "执行管理",
            avatar: `https://cdn.jsdelivr.net/gh/Miazzy/xdata-stock-service@v1.0.5/src/assets/img/paimai.png`,
            href: "/account/myanalyse",
            description: '对案件进展处于执行阶段的案件进行管理',
            click: () => {
                // $router.push(`/legal/legalmonth?type=month`);
            },
        }, {
            name: "再审管理",
            avatar: `https://cdn.jsdelivr.net/gh/Miazzy/xdata-stock-service@v1.0.5/src/assets/img/jungongyanshou_jy.png`,
            href: "/account/myanalyse",
            description: '对案件进展处于再审阶段的案件进行管理',
            click: () => {
                // $router.push(`/legal/legalmonth?type=quarter`);
            },
        }],
    }, {
        id: 'common-pane',
        title: '律所律师',
        taskflows: [{
            name: "律所录入",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/xdata-stock-service@v1.0.5/src/assets/img/xinwen_jy.png`,
            href: "/account/todolist",
            description: '律师事务所录入申请',
            click: () => {
                $router.push(`/legal/firmapply?type=1&tname=律所录入&apply=申请`, '_blank');
            }
        }, {
            name: "律师录入",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/xdata-stock-service@v1.0.5/src/assets/img/xiangmuxinxi_jy.png`,
            href: "/account/donelist",
            description: '律师事务所下律师录入申请',
            click: () => {
                $router.push(`/legal/lawyerapply?type=1&tname=律师录入&apply=申请`, '_blank');
            }
        }, {
            name: "律所管理",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/xdata-stock-service@v1.0.5/src/assets/img/xiezuowendangku_jy.png`,
            href: "/account/todolist",
            description: '律师事务所管理',
            click: () => {
                $router.push(`/legal/firmlist?type=1&tname=律所管理&apply=管理`, '_blank');
            }
        }, {
            name: "律师管理",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/xdata-stock-service@v1.0.5/src/assets/img/baomingfei.png`,
            href: "/account/todolist",
            description: '律师管理',
            click: () => {
                $router.push(`/legal/lawyerlist?type=1&tname=律师管理&apply=管理`, '_blank');
            }
        }],
    }, {
        id: 'law-pane',
        title: '法院法官',
        taskflows: [{
            name: "法院录入",
            avatar: `https://cdn.jsdelivr.net/gh/Miazzy/xdata-stock-service@v1.0.5/src/assets/img/anqiantiaojie.png`,
            href: "/account/todolist",
            description: '律师事务所录入申请',
            click: () => {
                $router.push(`/legal/firmapply?type=1&tname=律所录入&apply=申请`, '_blank');
            }
        }, {
            name: "法官录入",
            avatar: `https://cdn.jsdelivr.net/gh/Miazzy/xdata-stock-service@v1.0.5/src/assets/img/building-type-180000-18.png`,
            href: "/account/donelist",
            description: '律师事务所下律师录入申请',
            click: () => {
                $router.push(`/legal/lawyerapply?type=1&tname=律师录入&apply=申请`, '_blank');
            }
        }, {
            name: "法院管理",
            avatar: `https://cdn.jsdelivr.net/gh/Miazzy/xdata-stock-service@v1.0.5/src/assets/img/qiyehaozujian_jy.png`,
            href: "/account/todolist",
            description: '律师事务所管理',
            click: () => {
                $router.push(`/legal/firmlist?type=1&tname=律所管理&apply=管理`, '_blank');
            }
        }, {
            name: "法官管理",
            avatar: `https://cdn.jsdelivr.net/gh/Miazzy/xdata-stock-service@v1.0.5/src/assets/img/dushu_sn01.png`,
            href: "/account/todolist",
            description: '律师管理',
            click: () => {
                $router.push(`/legal/lawyerlist?type=1&tname=律师管理&apply=管理`, '_blank');
            }
        }],
    }]
};

export const getRewardQuickTag = ($router) => {
    return [{
        name: '我的待办',
        color: 'purple',
        click: () => {

        },
    }, {
        name: '我的已办',
        color: 'cyan',
        click: () => {

        },
    }, {
        name: '我的申请',
        color: 'cyan',
        click: () => {

        },
    }, {
        name: '我的知会',
        color: 'pink',
        click: () => {

        },
    }, {
        name: '统计分析',
        color: 'blue',
        click: () => {

        },
    }, ];
};

export const getRewardWflow = ($router) => {
    return [{
            name: "月度流程",
            avatar: "//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/icon-file-04.svg",
            href: "/account/center",
            click: () => {

            }
        },
        {
            name: "季度流程",
            avatar: "//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/icon-file-04.svg",
            href: "/account/authors/index",
            click: () => {

            }
        },
        {
            name: "年度流程",
            avatar: "//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/icon-file-04.svg",
            href: "/blog/rank",
            click: () => {

            }
        },
        {
            name: "流程报表",
            avatar: "//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/icon-rank-01.svg",
            href: "/blog/center",
            click: () => {

            }
        }
    ];
}

export const getLawWebsiteflow = ($router) => {
    return [{
            name: "中国裁判文书网",
            span: 24,
            href: "https://wenshu.court.gov.cn/",
            click: () => {
                window.open('https://wenshu.court.gov.cn/', '_blank');
            }
        },
        {
            name: "人民法院公告网",
            span: 24,
            href: "https://rmfygg.court.gov.cn/",
            click: () => {
                window.open("https://rmfygg.court.gov.cn/", '_blank');
            }
        },
        {
            name: "中国执行信息公开网",
            span: 24,
            href: "http://zxgk.court.gov.cn/zhzxgk/",
            click: () => {
                window.open("http://zxgk.court.gov.cn/zhzxgk/", '_blank');
            }
        },
        {
            name: "中国法院网",
            span: 24,
            href: "https://www.chinacourt.org/index.shtml",
            click: () => {
                window.open("https://www.chinacourt.org/index.shtml", '_blank');
            }
        },
        {
            name: "中国庭审公开网",
            span: 24,
            href: "http://tingshen.court.gov.cn/",
            click: () => {
                window.open("http://tingshen.court.gov.cn/", '_blank');
            }
        },
        {
            name: "人民法院诉讼资产网",
            span: 24,
            href: "https://www.rmfysszc.gov.cn/",
            click: () => {
                window.open("http://tingshen.court.gov.cn/", '_blank');
            }
        },
        {
            name: "中国政府网",
            span: 24,
            href: "http://www.gov.cn/",
            click: () => {
                window.open("http://www.gov.cn/", '_blank');
            }
        },
        {
            name: "中国政府网-法律法规",
            span: 24,
            href: "http://www.gov.cn/ziliao/flfg/index.htm",
            click: () => {
                window.open("http://www.gov.cn/ziliao/flfg/index.htm", '_blank');
            }
        },
        {
            name: "法律法规数据库",
            span: 24,
            href: "http://search.chinalaw.gov.cn/search2.html",
            click: () => {
                window.open("http://search.chinalaw.gov.cn/search2.html", '_blank');
            }
        },
        {
            name: "中国法院网法律文库",
            span: 24,
            href: "https://www.chinacourt.org/law",
            click: () => {
                window.open("https://www.chinacourt.org/law", '_blank');
            }
        },
        {
            name: "企查查",
            span: 6,
            href: "https://www.qcc.com/",
            click: () => {
                window.open("https://www.qcc.com/", '_blank');
            }
        },
        {
            name: "天眼查",
            span: 6,
            href: "https://www.tianyancha.com/",
            click: () => {
                window.open("https://www.tianyancha.com/", '_blank');
            }
        },
        {
            name: "启信宝",
            span: 6,
            href: "https://www.qixin.com/",
            click: () => {
                window.open("https://www.qixin.com/", '_blank');
            }
        },
        {
            name: "爱企查",
            span: 6,
            href: "https://aiqicha.baidu.com/",
            click: () => {
                window.open("https://aiqicha.baidu.com/", '_blank');
            }
        },
    ];
}

export const courtList = () => {
    return [
        { "label": "", "value": "" },
        {
            "label": "北京市高级人民法院",
            "value": "北京市高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "北京市第一中级人民法院",
                    "value": "北京市第一中级人民法院",
                    "children": [
                        { "label": "", "value": "" },
                        { "label": "北京市石景山区人民法院", "value": "北京市石景山区人民法院" },
                        { "label": "北京市海淀区人民法院", "value": "北京市海淀区人民法院" },
                        { "label": "北京市门头沟区人民法院", "value": "北京市门头沟区人民法院" },
                        { "label": "北京市昌平区人民法院", "value": "北京市昌平区人民法院" },
                        { "label": "北京市延庆区人民法院", "value": "北京市延庆区人民法院" },
                    ]
                },
                {
                    "label": "北京市第二中级人民法院",
                    "value": "北京市第二中级人民法院",
                    "children": [
                        { "label": "", "value": "" },
                        { "label": "北京市东城区人民法院", "value": "北京市东城区人民法院" },
                        { "label": "北京市丰台区人民法院", "value": "北京市丰台区人民法院" },
                        { "label": "北京市西城区人民法院", "value": "北京市西城区人民法院" },
                        { "label": "北京市房山区人民法院", "value": "北京市房山区人民法院" },
                        { "label": "北京市大兴区人民法院", "value": "北京市大兴区人民法院" },
                    ]
                },
                {
                    "label": "北京市第三中级人民法院",
                    "value": "北京市第三中级人民法院",
                    "children": [
                        { "label": "", "value": "" },
                        { "label": "北京市朝阳区人民法院", "value": "北京市朝阳区人民法院" },
                        { "label": "北京市顺义区人民法院", "value": "北京市顺义区人民法院" },
                        { "label": "北京市通州区人民法院", "value": "北京市通州区人民法院" },
                        { "label": "北京市平谷区人民法院", "value": "北京市平谷区人民法院" },
                        { "label": "北京市怀柔区人民法院", "value": "北京市怀柔区人民法院" },
                        { "label": "北京市密云区人民法院", "value": "北京市密云区人民法院" },
                    ]
                },
                {
                    "label": "北京市第四中级人民法院",
                    "value": "北京市第四中级人民法院",
                    "children": [
                        { "label": "", "value": "" },
                        { "label": "北京铁路运输法院", "value": "北京铁路运输法院" },
                        { "label": "北京互联网法院", "value": "北京互联网法院" },
                    ]
                },
                {
                    "label": "北京铁路运输中级法院",
                    "value": "北京铁路运输中级法院",
                    "children": [
                        { "label": "", "value": "" },
                        { "label": "北京铁路运输法院", "value": "北京铁路运输法院" },
                        { "label": "北京互联网法院", "value": "北京互联网法院" },
                    ]
                },
                { "label": "北京知识产权法院", "value": "北京知识产权法院" },
            ]
        },
        {
            "label": "天津市高级人民法院",
            "value": "天津市高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "天津市第一中级人民法院",
                    "value": "天津市第一中级人民法院",
                    "children": [
                        { "label": "", "value": "" },
                        { "label": "天津市和平区人民法院", "value": "天津市和平区人民法院" },
                        { "label": "天津市南开区人民法院", "value": "天津市南开区人民法院" },
                        { "label": "天津市红桥区人民法院", "value": "天津市红桥区人民法院" },
                        { "label": "天津市西青区人民法院", "value": "天津市西青区人民法院" },
                        { "label": "天津市武清区人民法院", "value": "天津市武清区人民法院" },
                        { "label": "天津市宝坻区人民法院", "value": "天津市宝坻区人民法院" },
                        { "label": "天津市蓟州区人民法院", "value": "天津市蓟州区人民法院" },
                        { "label": "天津铁路运输法院", "value": "天津铁路运输法院" },
                    ]
                },
                {
                    "label": "天津市第二中级人民法院",
                    "value": "天津市第二中级人民法院",
                    "children": [
                        { "label": "", "value": "" },
                        { "label": "天津市河东区人民法院", "value": "天津市河东区人民法院" },
                        { "label": "天津市河西区人民法院", "value": "天津市河西区人民法院" },
                        { "label": "天津市河北区人民法院", "value": "天津市河北区人民法院" },
                        { "label": "天津市津南区人民法院", "value": "天津市津南区人民法院" },
                        { "label": "天津市北辰区人民法院", "value": "天津市北辰区人民法院" },
                        { "label": "天津市静海区人民法院", "value": "天津市静海区人民法院" },
                    ]
                },
                {
                    "label": "天津市第三中级人民法院",
                    "value": "天津市第三中级人民法院",
                    "children": [
                        { "label": "", "value": "" },
                        { "label": "天津市滨海新区人民法院", "value": "天津市滨海新区人民法院" },
                        { "label": "天津市东丽区人民法院", "value": "天津市东丽区人民法院" },
                        { "label": "天津市宁河区人民法院", "value": "天津市宁河区人民法院" },
                    ]
                },
                { "label": "天津海事法院", "value": "天津海事法院" }
            ]
        },
        {
            "label": "河北省高级人民法院",
            "value": "河北省高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "河北省石家庄市中级人民法院",
                    "value": "河北省石家庄市中级人民法院",
                    "children": [
                        { "label": "", "value": "" },
                        { "label": "石家庄市长安区人民法院", "value": "石家庄市长安区人民法院" },
                        { "label": "石家庄市桥西区人民法院", "value": "石家庄市桥西区人民法院" },
                        { "label": "石家庄市新华区人民法院", "value": "石家庄市新华区人民法院" },
                        { "label": "石家庄市裕华区人民法院", "value": "石家庄市裕华区人民法院" },
                        { "label": "井陉县人民法院", "value": "井陉县人民法院" },
                        { "label": "石家庄市鹿泉区人民法院", "value": "石家庄市鹿泉区人民法院" },
                        { "label": "正定县人民法院", "value": "正定县人民法院" },
                        { "label": "石家庄市栾城区人民法院", "value": "石家庄市栾城区人民法院" },
                        { "label": "辛集市人民法院", "value": "辛集市人民法院" },
                        { "label": "石家庄市藁城区人民法院", "value": "石家庄市藁城区人民法院" },
                        { "label": "晋州市人民法院", "value": "晋州市人民法院" },
                        { "label": "深泽县人民法院", "value": "深泽县人民法院" },
                        { "label": "无极县人民法院", "value": "无极县人民法院" },
                        { "label": "赵县人民法院", "value": "赵县人民法院" },
                        { "label": "新乐市人民法院", "value": "新乐市人民法院" },
                        { "label": "高邑县人民法院", "value": "高邑县人民法院" },
                        { "label": "元氏县人民法院", "value": "元氏县人民法院" },
                        { "label": "赞皇县人民法院", "value": "赞皇县人民法院" },
                        { "label": "平山县人民法院", "value": "平山县人民法院" },
                        { "label": "灵寿县人民法院", "value": "灵寿县人民法院" },
                        { "label": "行唐县人民法院", "value": "行唐县人民法院" },
                        { "label": "石家庄市井陉矿区人民法院", "value": "石家庄市井陉矿区人民法院" },
                        { "label": "石家庄高新技术产业开发区人民法院", "value": "石家庄高新技术产业开发区人民法院" },
                        { "label": "石家庄铁路运输法院", "value": "石家庄铁路运输法院" },
                    ],
                },
                {
                    "label": "河北省唐山市中级人民法院",
                    "value": "河北省唐山市中级人民法院",
                    "children": [
                        { "label": "", "value": "" },
                        { "label": "唐山市路南区人民法院", "value": "唐山市路南区人民法院" },
                        { "label": "唐山市路北区人民法院", "value": "唐山市路北区人民法院" },
                        { "label": "唐山市古冶区人民法院", "value": "唐山市古冶区人民法院" },
                        { "label": "唐山市开平区人民法院", "value": "唐山市开平区人民法院" },
                        { "label": "唐山市丰润区人民法院", "value": "唐山市丰润区人民法院" },
                        { "label": "唐山市丰南区人民法院", "value": "唐山市丰南区人民法院" },
                        { "label": "滦县人民法院", "value": "滦县人民法院" },
                        { "label": "滦南县人民法院", "value": "滦南县人民法院" },
                        { "label": "乐亭县人民法院", "value": "乐亭县人民法院" },
                        { "label": "迁安市人民法院", "value": "迁安市人民法院" },
                        { "label": "迁西县人民法院", "value": "迁西县人民法院" },
                        { "label": "遵化市人民法院", "value": "遵化市人民法院" },
                        { "label": "玉田县人民法院", "value": "玉田县人民法院" },
                        { "label": "唐山市曹妃甸区人民法院", "value": "唐山市曹妃甸区人民法院" },
                        { "label": "唐山高新技术产业开发区人民法院", "value": "唐山高新技术产业开发区人民法院" },

                    ],
                },
                {
                    "label": "河北省秦皇岛市中级人民法院",
                    "value": "河北省秦皇岛市中级人民法院",
                    "children": [
                        { "label": "", "value": "" },
                        { "label": "秦皇岛市海港区人民法院", "value": "秦皇岛市海港区人民法院" },
                        { "label": "秦皇岛市山海关区人民法院", "value": "秦皇岛市山海关区人民法院" },
                        { "label": "秦皇岛市北戴河区人民法院", "value": "秦皇岛市北戴河区人民法院" },
                        { "label": "昌黎县人民法院", "value": "昌黎县人民法院" },
                        { "label": "秦皇岛市抚宁区人民法院", "value": "秦皇岛市抚宁区人民法院" },
                        { "label": "卢龙县人民法院", "value": "卢龙县人民法院" },
                        { "label": "青龙满族自治县人民法院", "value": "青龙满族自治县人民法院" },
                        { "label": "秦皇岛经济技术开发区人民法院", "value": "秦皇岛经济技术开发区人民法院" },
                        { "label": "秦皇岛北戴河新区人民法院", "value": "秦皇岛北戴河新区人民法院" },
                    ],
                },
                {
                    "label": "河北省邯郸市中级人民法院",
                    "value": "河北省邯郸市中级人民法院",
                    "children": [
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                    ],
                },
                {
                    "label": "河北省邢台市中级人民法院",
                    "value": "河北省邢台市中级人民法院",
                    "children": [
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                    ],
                },
                {
                    "label": "河北省保定市中级人民法院",
                    "value": "河北省保定市中级人民法院",
                    "children": [
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                    ],
                },
                {
                    "label": "河北省张家口市中级人民法院",
                    "value": "河北省张家口市中级人民法院",
                    "children": [
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                    ],
                },
                {
                    "label": "河北省承德市中级人民法院",
                    "value": "河北省承德市中级人民法院",
                    "children": [
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                    ],
                },
                {
                    "label": "河北省沧州市中级人民法院",
                    "value": "河北省沧州市中级人民法院",
                    "children": [
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                    ],
                },
                {
                    "label": "河北省廊坊市中级人民法院",
                    "value": "河北省廊坊市中级人民法院",
                    "children": [
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                    ],
                },
                {
                    "label": "河北省衡水市中级人民法院",
                    "value": "河北省衡水市中级人民法院",
                    "children": [
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                    ],
                },
                {
                    "label": "河北雄安新区中级人民法院",
                    "value": "河北雄安新区中级人民法院",
                    "children": [
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                        { "label": "", "value": "" },
                    ],
                },
            ]
        },
        {
            "label": "山西省高级人民法院",
            "value": "山西省高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "山西省太原市中级人民法院",
                    "value": "山西省太原市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "山西省大同市中级人民法院",
                    "value": "山西省大同市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "山西省阳泉市中级人民法院",
                    "value": "山西省阳泉市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "山西省长治市中级人民法院",
                    "value": "山西省长治市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "山西省晋城市中级人民法院",
                    "value": "山西省晋城市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "山西省朔州市中级人民法院",
                    "value": "山西省朔州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "山西省忻州市中级人民法院",
                    "value": "山西省忻州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "山西省吕梁市中级人民法院",
                    "value": "山西省吕梁市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "山西省晋中市中级人民法院",
                    "value": "山西省晋中市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "山西省临汾市中级人民法院",
                    "value": "山西省临汾市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "山西省运城市中级人民法院",
                    "value": "山西省运城市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "太原铁路运输中级法院",
                    "value": "太原铁路运输中级法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "内蒙古自治区高级人民法院",
            "value": "内蒙古自治区高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "内蒙古自治区呼和浩特市中级人民法院",
                    "value": "内蒙古自治区呼和浩特市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "内蒙古自治区包头市中级人民法院",
                    "value": "内蒙古自治区包头市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "内蒙古自治区乌海市中级人民法院",
                    "value": "内蒙古自治区乌海市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "内蒙古自治区赤峰市中级人民法院",
                    "value": "内蒙古自治区赤峰市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "内蒙古自治区呼伦贝尔市中级人民法院",
                    "value": "内蒙古自治区呼伦贝尔市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "内蒙古自治区兴安盟中级人民法院",
                    "value": "内蒙古自治区兴安盟中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "内蒙古自治区通辽市中级人民法院",
                    "value": "内蒙古自治区通辽市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "内蒙古自治区锡林郭勒盟中级人民法院",
                    "value": "内蒙古自治区锡林郭勒盟中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "内蒙古自治区乌兰察布市中级人民法院",
                    "value": "内蒙古自治区乌兰察布市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "内蒙古自治区鄂尔多斯市中级人民法院",
                    "value": "内蒙古自治区鄂尔多斯市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "内蒙古自治区巴彦淖尔市中级人民法院",
                    "value": "内蒙古自治区巴彦淖尔市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "内蒙古自治区阿拉善盟中级人民法院",
                    "value": "内蒙古自治区阿拉善盟中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "呼和浩特铁路运输中级法院",
                    "value": "呼和浩特铁路运输中级法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "辽宁省高级人民法院",
            "value": "辽宁省高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "辽宁省沈阳市中级人民法院",
                    "value": "辽宁省沈阳市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "辽宁省大连市中级人民法院",
                    "value": "辽宁省大连市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "辽宁省鞍山市中级人民法院",
                    "value": "辽宁省鞍山市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "辽宁省抚顺市中级人民法院",
                    "value": "辽宁省抚顺市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "辽宁省本溪市中级人民法院",
                    "value": "辽宁省本溪市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "辽宁省丹东市中级人民法院",
                    "value": "辽宁省丹东市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "辽宁省锦州市中级人民法院",
                    "value": "辽宁省锦州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "辽宁省营口市中级人民法院",
                    "value": "辽宁省营口市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "辽宁省阜新市中级人民法院",
                    "value": "辽宁省阜新市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "辽宁省辽阳市中级人民法院",
                    "value": "辽宁省辽阳市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "辽宁省盘锦市中级人民法院",
                    "value": "辽宁省盘锦市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "辽宁省铁岭市中级人民法院",
                    "value": "辽宁省铁岭市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "辽宁省朝阳市中级人民法院",
                    "value": "辽宁省朝阳市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "辽宁省葫芦岛市中级人民法院",
                    "value": "辽宁省葫芦岛市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "沈阳铁路运输中级法院",
                    "value": "沈阳铁路运输中级法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "辽宁省辽河中级人民法院",
                    "value": "辽宁省辽河中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "大连海事法院",
                    "value": "大连海事法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "吉林省高级人民法院",
            "value": "吉林省高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "吉林省长春市中级人民法院",
                    "value": "吉林省长春市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "吉林省吉林市中级人民法院",
                    "value": "吉林省吉林市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "吉林省四平市中级人民法院",
                    "value": "吉林省四平市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "吉林省辽源市中级人民法院",
                    "value": "吉林省辽源市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "吉林省通化市中级人民法院",
                    "value": "吉林省通化市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "吉林省白山市中级人民法院",
                    "value": "吉林省白山市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "吉林省白城市中级人民法院",
                    "value": "吉林省白城市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "吉林省延边朝鲜族自治州中级人民法院",
                    "value": "吉林省延边朝鲜族自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "吉林省延边林区中级法院",
                    "value": "吉林省延边林区中级法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "吉林省松原市中级人民法院",
                    "value": "吉林省松原市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "吉林省长春林区中级法院",
                    "value": "吉林省长春林区中级法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "长春铁路运输中级法院",
                    "value": "长春铁路运输中级法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "黑龙江省高级人民法院",
            "value": "黑龙江省高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "黑龙江省哈尔滨市中级人民法院",
                    "value": "黑龙江省哈尔滨市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "黑龙江省齐齐哈尔市中级人民法院",
                    "value": "黑龙江省齐齐哈尔市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "黑龙江省鸡西市中级人民法院",
                    "value": "黑龙江省鸡西市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "黑龙江省鹤岗市中级人民法院",
                    "value": "黑龙江省鹤岗市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "黑龙江省双鸭山市中级人民法院",
                    "value": "黑龙江省双鸭山市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "黑龙江省大庆市中级人民法院",
                    "value": "黑龙江省大庆市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "黑龙江省伊春市中级人民法院",
                    "value": "黑龙江省伊春市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "黑龙江省佳木斯市中级人民法院",
                    "value": "黑龙江省佳木斯市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "黑龙江省七台河市中级人民法院",
                    "value": "黑龙江省七台河市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "黑龙江省牡丹江市中级人民法院",
                    "value": "黑龙江省牡丹江市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "黑龙江省绥化市中级人民法院",
                    "value": "黑龙江省绥化市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "黑龙江省黑河市中级人民法院",
                    "value": "黑龙江省黑河市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "黑龙江省大兴安岭地区中级人民法院",
                    "value": "黑龙江省大兴安岭地区中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "哈尔滨铁路运输中级法院",
                    "value": "哈尔滨铁路运输中级法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "黑龙江省林区中级人民法院",
                    "value": "黑龙江省林区中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "黑龙江省农垦中级法院",
                    "value": "黑龙江省农垦中级法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "上海市高级人民法院",
            "value": "上海市高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "上海市第一中级人民法院",
                    "value": "上海市第一中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "上海市第二中级人民法院",
                    "value": "上海市第二中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "上海铁路运输中级法院",
                    "value": "上海铁路运输中级法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "上海海事法院",
                    "value": "上海海事法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "上海市第三中级人民法院",
                    "value": "上海市第三中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "上海知识产权法院",
                    "value": "上海知识产权法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "上海金融法院",
                    "value": "上海金融法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "江苏省高级人民法院",
            "value": "江苏省高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "江苏省南京市中级人民法院",
                    "value": "江苏省南京市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "江苏省无锡市中级人民法院",
                    "value": "江苏省无锡市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "江苏省徐州市中级人民法院",
                    "value": "江苏省徐州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "江苏省常州市中级人民法院",
                    "value": "江苏省常州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "江苏省苏州市中级人民法院",
                    "value": "江苏省苏州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "江苏省南通市中级人民法院",
                    "value": "江苏省南通市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "江苏省连云港市中级人民法院",
                    "value": "江苏省连云港市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "江苏省淮安市中级人民法院",
                    "value": "江苏省淮安市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "江苏省盐城市中级人民法院",
                    "value": "江苏省盐城市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "江苏省扬州市中级人民法院",
                    "value": "江苏省扬州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "江苏省镇江市中级人民法院",
                    "value": "江苏省镇江市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "江苏省泰州市中级人民法院",
                    "value": "江苏省泰州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "江苏省宿迁市中级人民法院",
                    "value": "江苏省宿迁市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "南京铁路运输法院",
                    "value": "南京铁路运输法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "徐州铁路运输法院",
                    "value": "徐州铁路运输法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "浙江省高级人民法院",
            "value": "浙江省高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "浙江省杭州市中级人民法院",
                    "value": "浙江省杭州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "浙江省宁波市中级人民法院",
                    "value": "浙江省宁波市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "浙江省温州市中级人民法院",
                    "value": "浙江省温州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "浙江省嘉兴市中级人民法院",
                    "value": "浙江省嘉兴市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "浙江省湖州市中级人民法院",
                    "value": "浙江省湖州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "浙江省绍兴市中级人民法院",
                    "value": "浙江省绍兴市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "浙江省金华市中级人民法院",
                    "value": "浙江省金华市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "浙江省衢州市中级人民法院",
                    "value": "浙江省衢州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "浙江省舟山市中级人民法院",
                    "value": "浙江省舟山市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "浙江省丽水市中级人民法院",
                    "value": "浙江省丽水市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "浙江省台州市中级人民法院",
                    "value": "浙江省台州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "宁波海事法院",
                    "value": "宁波海事法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "安徽省高级人民法院",
            "value": "安徽省高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "安徽省合肥市中级人民法院",
                    "value": "安徽省合肥市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "安徽省芜湖市中级人民法院",
                    "value": "安徽省芜湖市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "安徽省蚌埠市中级人民法院",
                    "value": "安徽省蚌埠市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "安徽省淮南市中级人民法院",
                    "value": "安徽省淮南市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "安徽省马鞍山市中级人民法院",
                    "value": "安徽省马鞍山市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "安徽省淮北市中级人民法院",
                    "value": "安徽省淮北市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "安徽省铜陵市中级人民法院",
                    "value": "安徽省铜陵市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "安徽省安庆市中级人民法院",
                    "value": "安徽省安庆市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "安徽省黄山市中级人民法院",
                    "value": "安徽省黄山市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "安徽省阜阳市中级人民法院",
                    "value": "安徽省阜阳市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "安徽省宿州市中级人民法院",
                    "value": "安徽省宿州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "安徽省滁州市中级人民法院",
                    "value": "安徽省滁州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "安徽省六安市中级人民法院",
                    "value": "安徽省六安市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "安徽省宣城市中级人民法院",
                    "value": "安徽省宣城市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "安徽省池州市中级人民法院",
                    "value": "安徽省池州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "安徽省亳州市中级人民法院",
                    "value": "安徽省亳州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "福建省高级人民法院",
            "value": "福建省高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "福建省福州市中级人民法院",
                    "value": "福建省福州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "福建省厦门市中级人民法院",
                    "value": "福建省厦门市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "福建省莆田市中级人民法院",
                    "value": "福建省莆田市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "福建省三明市中级人民法院",
                    "value": "福建省三明市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "福建省泉州市中级人民法院",
                    "value": "福建省泉州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "福建省漳州市中级人民法院",
                    "value": "福建省漳州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "福建省南平市中级人民法院",
                    "value": "福建省南平市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "福建省宁德市中级人民法院",
                    "value": "福建省宁德市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "福建省龙岩市中级人民法院",
                    "value": "福建省龙岩市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "厦门海事法院",
                    "value": "厦门海事法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "福州铁路运输法院",
                    "value": "福州铁路运输法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "江西省高级人民法院",
            "value": "江西省高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "江西省南昌市中级人民法院",
                    "value": "江西省南昌市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "江西省景德镇市中级人民法院",
                    "value": "江西省景德镇市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "江西省萍乡市中级人民法院",
                    "value": "江西省萍乡市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "江西省九江市中级人民法院",
                    "value": "江西省九江市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "江西省新余市中级人民法院",
                    "value": "江西省新余市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "江西省鹰潭市中级人民法院",
                    "value": "江西省鹰潭市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "江西省赣州市中级人民法院",
                    "value": "江西省赣州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "江西省宜春市中级人民法院",
                    "value": "江西省宜春市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "江西省上饶市中级人民法院",
                    "value": "江西省上饶市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "江西省吉安市中级人民法院",
                    "value": "江西省吉安市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "江西省抚州市中级人民法院",
                    "value": "江西省抚州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "南昌铁路运输中级法院",
                    "value": "南昌铁路运输中级法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "山东省高级人民法院",
            "value": "山东省高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "山东省济南市中级人民法院",
                    "value": "山东省济南市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "山东省青岛市中级人民法院",
                    "value": "山东省青岛市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "山东省淄博市中级人民法院",
                    "value": "山东省淄博市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "山东省枣庄市中级人民法院",
                    "value": "山东省枣庄市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "山东省东营市中级人民法院",
                    "value": "山东省东营市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "山东省烟台市中级人民法院",
                    "value": "山东省烟台市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "山东省潍坊市中级人民法院",
                    "value": "山东省潍坊市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "山东省济宁市中级人民法院",
                    "value": "山东省济宁市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "山东省泰安市中级人民法院",
                    "value": "山东省泰安市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "山东省威海市中级人民法院",
                    "value": "山东省威海市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "山东省日照市中级人民法院",
                    "value": "山东省日照市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "山东省滨州市中级人民法院",
                    "value": "山东省滨州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "山东省德州市中级人民法院",
                    "value": "山东省德州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "山东省聊城市中级人民法院",
                    "value": "山东省聊城市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "山东省临沂市中级人民法院",
                    "value": "山东省临沂市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "山东省菏泽市中级人民法院",
                    "value": "山东省菏泽市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "济南铁路运输中级法院",
                    "value": "济南铁路运输中级法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "青岛海事法院",
                    "value": "青岛海事法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "河南省高级人民法院",
            "value": "河南省高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "河南省郑州市中级人民法院",
                    "value": "河南省郑州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "河南省开封市中级人民法院",
                    "value": "河南省开封市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "河南省洛阳市中级人民法院",
                    "value": "河南省洛阳市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "河南省平顶山市中级人民法院",
                    "value": "河南省平顶山市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "河南省安阳市中级人民法院",
                    "value": "河南省安阳市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "河南省鹤壁市中级人民法院",
                    "value": "河南省鹤壁市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "河南省新乡市中级人民法院",
                    "value": "河南省新乡市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "河南省焦作市中级人民法院",
                    "value": "河南省焦作市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "河南省濮阳市中级人民法院",
                    "value": "河南省濮阳市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "河南省许昌市中级人民法院",
                    "value": "河南省许昌市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "河南省漯河市中级人民法院",
                    "value": "河南省漯河市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "河南省三门峡市中级人民法院",
                    "value": "河南省三门峡市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "河南省商丘市中级人民法院",
                    "value": "河南省商丘市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "河南省周口市中级人民法院",
                    "value": "河南省周口市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "河南省驻马店市中级人民法院",
                    "value": "河南省驻马店市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "河南省南阳市中级人民法院",
                    "value": "河南省南阳市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "河南省信阳市中级人民法院",
                    "value": "河南省信阳市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "郑州铁路运输中级法院",
                    "value": "郑州铁路运输中级法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "河南省济源中级人民法院",
                    "value": "河南省济源中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "湖北省高级人民法院",
            "value": "湖北省高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "湖北省武汉市中级人民法院",
                    "value": "湖北省武汉市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "湖北省黄石市中级人民法院",
                    "value": "湖北省黄石市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "湖北省十堰市中级人民法院",
                    "value": "湖北省十堰市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "湖北省荆州市中级人民法院",
                    "value": "湖北省荆州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "湖北省宜昌市中级人民法院",
                    "value": "湖北省宜昌市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "湖北省襄阳市中级人民法院",
                    "value": "湖北省襄阳市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "湖北省鄂州市中级人民法院",
                    "value": "湖北省鄂州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "湖北省荆门市中级人民法院",
                    "value": "湖北省荆门市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "湖北省黄冈市中级人民法院",
                    "value": "湖北省黄冈市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "湖北省孝感市中级人民法院",
                    "value": "湖北省孝感市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "湖北省咸宁市中级人民法院",
                    "value": "湖北省咸宁市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "湖北省恩施土家族苗族自治州中级人民法院",
                    "value": "湖北省恩施土家族苗族自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "湖北省汉江中级人民法院",
                    "value": "湖北省汉江中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "湖北省随州市中级人民法院",
                    "value": "湖北省随州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "武汉海事法院",
                    "value": "武汉海事法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "武汉铁路运输中级法院",
                    "value": "武汉铁路运输中级法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "湖南省高级人民法院",
            "value": "湖南省高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "湖南省长沙市中级人民法院",
                    "value": "湖南省长沙市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "湖南省株洲市中级人民法院",
                    "value": "湖南省株洲市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "湖南省湘潭市中级人民法院",
                    "value": "湖南省湘潭市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "湖南省衡阳市中级人民法院",
                    "value": "湖南省衡阳市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "湖南省邵阳市中级人民法院",
                    "value": "湖南省邵阳市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "湖南省岳阳市中级人民法院",
                    "value": "湖南省岳阳市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "湖南省常德市中级人民法院",
                    "value": "湖南省常德市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "湖南省张家界市中级人民法院",
                    "value": "湖南省张家界市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "湖南省益阳市中级人民法院",
                    "value": "湖南省益阳市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "湖南省娄底市中级人民法院",
                    "value": "湖南省娄底市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "湖南省郴州市中级人民法院",
                    "value": "湖南省郴州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "湖南省永州市中级人民法院",
                    "value": "湖南省永州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "湖南省怀化市中级人民法院",
                    "value": "湖南省怀化市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "湖南省湘西土家族苗族自治州中级人民法院",
                    "value": "湖南省湘西土家族苗族自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "长沙铁路运输法院",
                    "value": "长沙铁路运输法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "衡阳铁路运输法院",
                    "value": "衡阳铁路运输法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "怀化铁路运输法院",
                    "value": "怀化铁路运输法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "广东省高级人民法院",
            "value": "广东省高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "广东省广州市中级人民法院",
                    "value": "广东省广州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广东省韶关市中级人民法院",
                    "value": "广东省韶关市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广东省深圳市中级人民法院",
                    "value": "广东省深圳市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广东省珠海市中级人民法院",
                    "value": "广东省珠海市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广东省汕头市中级人民法院",
                    "value": "广东省汕头市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广东省佛山市中级人民法院",
                    "value": "广东省佛山市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广东省江门市中级人民法院",
                    "value": "广东省江门市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广东省湛江市中级人民法院",
                    "value": "广东省湛江市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广东省茂名市中级人民法院",
                    "value": "广东省茂名市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广东省中山市中级人民法院",
                    "value": "广东省中山市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广东省东莞市中级人民法院",
                    "value": "广东省东莞市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广东省梅州市中级人民法院",
                    "value": "广东省梅州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广东省惠州市中级人民法院",
                    "value": "广东省惠州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广东省肇庆市中级人民法院",
                    "value": "广东省肇庆市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广东省汕尾市中级人民法院",
                    "value": "广东省汕尾市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广东省河源市中级人民法院",
                    "value": "广东省河源市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广东省阳江市中级人民法院",
                    "value": "广东省阳江市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广东省清远市中级人民法院",
                    "value": "广东省清远市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广东省潮州市中级人民法院",
                    "value": "广东省潮州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广东省揭阳市中级人民法院",
                    "value": "广东省揭阳市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广州铁路运输中级法院",
                    "value": "广州铁路运输中级法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广州海事法院",
                    "value": "广州海事法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广东省云浮市中级人民法院",
                    "value": "广东省云浮市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广州知识产权法院",
                    "value": "广州知识产权法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "广西壮族自治区高级人民法院",
            "value": "广西壮族自治区高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "广西壮族自治区南宁市中级人民法院",
                    "value": "广西壮族自治区南宁市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广西壮族自治区柳州市中级人民法院",
                    "value": "广西壮族自治区柳州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广西壮族自治区桂林市中级人民法院",
                    "value": "广西壮族自治区桂林市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广西壮族自治区梧州市中级人民法院",
                    "value": "广西壮族自治区梧州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广西壮族自治区北海市中级人民法院",
                    "value": "广西壮族自治区北海市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广西壮族自治区崇左市中级人民法院",
                    "value": "广西壮族自治区崇左市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广西壮族自治区来宾市中级人民法院",
                    "value": "广西壮族自治区来宾市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广西壮族自治区贺州市中级人民法院",
                    "value": "广西壮族自治区贺州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广西壮族自治区玉林市中级人民法院",
                    "value": "广西壮族自治区玉林市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广西壮族自治区百色市中级人民法院",
                    "value": "广西壮族自治区百色市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广西壮族自治区河池市中级人民法院",
                    "value": "广西壮族自治区河池市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广西壮族自治区钦州市中级人民法院",
                    "value": "广西壮族自治区钦州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "南宁铁路运输中级法院",
                    "value": "南宁铁路运输中级法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广西壮族自治区防城港市中级人民法院",
                    "value": "广西壮族自治区防城港市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "广西壮族自治区贵港市中级人民法院",
                    "value": "广西壮族自治区贵港市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "北海海事法院",
                    "value": "北海海事法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "海南省高级人民法院",
            "value": "海南省高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "海南省海口市中级人民法院",
                    "value": "海南省海口市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "海南省三亚市中级人民法院",
                    "value": "海南省三亚市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "海南省第一中级人民法院",
                    "value": "海南省第一中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "海口海事法院",
                    "value": "海口海事法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "海南省第二中级人民法院",
                    "value": "海南省第二中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "海南省三沙市中级人民法院",
                    "value": "海南省三沙市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "重庆市高级人民法院",
            "value": "重庆市高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "重庆市第一中级人民法院",
                    "value": "重庆市第一中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "重庆市第二中级人民法院",
                    "value": "重庆市第二中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "重庆市第三中级人民法院",
                    "value": "重庆市第三中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "重庆市第四中级人民法院",
                    "value": "重庆市第四中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "重庆市第五中级人民法院",
                    "value": "重庆市第五中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "四川省高级人民法院",
            "value": "四川省高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "四川省成都市中级人民法院",
                    "value": "四川省成都市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "四川省自贡市中级人民法院",
                    "value": "四川省自贡市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "四川省攀枝花市中级人民法院",
                    "value": "四川省攀枝花市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "四川省泸州市中级人民法院",
                    "value": "四川省泸州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "四川省德阳市中级人民法院",
                    "value": "四川省德阳市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "四川省绵阳市中级人民法院",
                    "value": "四川省绵阳市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "四川省广元市中级人民法院",
                    "value": "四川省广元市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "四川省遂宁市中级人民法院",
                    "value": "四川省遂宁市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "四川省内江市中级人民法院",
                    "value": "四川省内江市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "四川省宜宾市中级人民法院",
                    "value": "四川省宜宾市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "四川省南充市中级人民法院",
                    "value": "四川省南充市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "四川省达州市中级人民法院",
                    "value": "四川省达州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "四川省雅安市中级人民法院",
                    "value": "四川省雅安市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "四川省阿坝藏族羌族自治州中级人民法院",
                    "value": "四川省阿坝藏族羌族自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "四川省甘孜藏族自治州中级人民法院",
                    "value": "四川省甘孜藏族自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "四川省凉山彝族自治州中级人民法院",
                    "value": "四川省凉山彝族自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "成都铁路运输中级法院",
                    "value": "成都铁路运输中级法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "四川省广安市中级人民法院",
                    "value": "四川省广安市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "四川省巴中市中级人民法院",
                    "value": "四川省巴中市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "四川省眉山市中级人民法院",
                    "value": "四川省眉山市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "四川省资阳市中级人民法院",
                    "value": "四川省资阳市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "贵州省高级人民法院",
            "value": "贵州省高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "贵州省贵阳市中级人民法院",
                    "value": "贵州省贵阳市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "贵州省六盘水市中级人民法院",
                    "value": "贵州省六盘水市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "贵州省遵义市中级人民法院",
                    "value": "贵州省遵义市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "贵州省铜仁市中级人民法院",
                    "value": "贵州省铜仁市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "贵州省黔西南布依族苗族自治州中级人民法院",
                    "value": "贵州省黔西南布依族苗族自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "贵州省毕节市中级人民法院",
                    "value": "贵州省毕节市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "贵州省安顺市中级人民法院",
                    "value": "贵州省安顺市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "贵州省黔东南苗族侗族自治州中级人民法院",
                    "value": "贵州省黔东南苗族侗族自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "贵州省黔南布依族苗族自治州中级人民法院",
                    "value": "贵州省黔南布依族苗族自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "云南省高级人民法院",
            "value": "云南省高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "云南省昆明市中级人民法院",
                    "value": "云南省昆明市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "云南省昭通市中级人民法院",
                    "value": "云南省昭通市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "云南省曲靖市中级人民法院",
                    "value": "云南省曲靖市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "云南省玉溪市中级人民法院",
                    "value": "云南省玉溪市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "云南省普洱市中级人民法院",
                    "value": "云南省普洱市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "云南省保山市中级人民法院",
                    "value": "云南省保山市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "云南省丽江市中级人民法院",
                    "value": "云南省丽江市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "云南省临沧市中级人民法院",
                    "value": "云南省临沧市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "云南省楚雄彝族自治州中级人民法院",
                    "value": "云南省楚雄彝族自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "云南省红河哈尼族彝族自治州中级人民法院",
                    "value": "云南省红河哈尼族彝族自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "云南省文山壮族苗族自治州中级人民法院",
                    "value": "云南省文山壮族苗族自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "云南省西双版纳傣族自治州中级人民法院",
                    "value": "云南省西双版纳傣族自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "云南省大理白族自治州中级人民法院",
                    "value": "云南省大理白族自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "云南省德宏傣族景颇族自治州中级人民法院",
                    "value": "云南省德宏傣族景颇族自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "云南省怒江傈僳族自治州中级人民法院",
                    "value": "云南省怒江傈僳族自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "云南省迪庆藏族自治州中级人民法院",
                    "value": "云南省迪庆藏族自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "昆明铁路运输中级法院",
                    "value": "昆明铁路运输中级法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "西藏自治区高级人民法院",
            "value": "西藏自治区高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "西藏自治区拉萨市中级人民法院",
                    "value": "西藏自治区拉萨市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "西藏自治区昌都市中级人民法院",
                    "value": "西藏自治区昌都市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "西藏自治区山南市中级人民法院",
                    "value": "西藏自治区山南市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "西藏自治区日喀则市中级人民法院",
                    "value": "西藏自治区日喀则市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "西藏自治区那曲市中级人民法院",
                    "value": "西藏自治区那曲市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "西藏自治区阿里地区中级人民法院",
                    "value": "西藏自治区阿里地区中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "西藏自治区林芝市中级人民法院",
                    "value": "西藏自治区林芝市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "陕西省高级人民法院",
            "value": "陕西省高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "陕西省西安市中级人民法院",
                    "value": "陕西省西安市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "陕西省铜川市中级人民法院",
                    "value": "陕西省铜川市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "陕西省宝鸡市中级人民法院",
                    "value": "陕西省宝鸡市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "陕西省咸阳市中级人民法院",
                    "value": "陕西省咸阳市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "陕西省渭南市中级人民法院",
                    "value": "陕西省渭南市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "陕西省汉中市中级人民法院",
                    "value": "陕西省汉中市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "陕西省安康市中级人民法院",
                    "value": "陕西省安康市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "陕西省商洛市中级人民法院",
                    "value": "陕西省商洛市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "陕西省延安市中级人民法院",
                    "value": "陕西省延安市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "陕西省榆林市中级人民法院",
                    "value": "陕西省榆林市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "西安铁路运输中级法院",
                    "value": "西安铁路运输中级法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "甘肃省高级人民法院",
            "value": "甘肃省高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "甘肃省兰州市中级人民法院",
                    "value": "甘肃省兰州市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "甘肃省嘉峪关市中级人民法院",
                    "value": "甘肃省嘉峪关市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "甘肃省金昌市中级人民法院",
                    "value": "甘肃省金昌市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "甘肃省白银市中级人民法院",
                    "value": "甘肃省白银市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "甘肃省天水市中级人民法院",
                    "value": "甘肃省天水市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "甘肃省酒泉市中级人民法院",
                    "value": "甘肃省酒泉市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "甘肃省张掖市中级人民法院",
                    "value": "甘肃省张掖市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "甘肃省武威市中级人民法院",
                    "value": "甘肃省武威市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "甘肃省定西市中级人民法院",
                    "value": "甘肃省定西市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "甘肃省陇南市中级人民法院",
                    "value": "甘肃省陇南市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "甘肃省平凉市中级人民法院",
                    "value": "甘肃省平凉市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "甘肃省庆阳市中级人民法院",
                    "value": "甘肃省庆阳市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "甘肃省临夏回族自治州中级人民法院",
                    "value": "甘肃省临夏回族自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "甘肃省甘南藏族自治州中级人民法院",
                    "value": "甘肃省甘南藏族自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "甘肃矿区人民法院",
                    "value": "甘肃矿区人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "甘肃省林区中级法院",
                    "value": "甘肃省林区中级法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "兰州铁路运输中级法院",
                    "value": "兰州铁路运输中级法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "青海省高级人民法院",
            "value": "青海省高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "青海省西宁市中级人民法院",
                    "value": "青海省西宁市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "青海省海东市中级人民法院",
                    "value": "青海省海东市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "青海省海北藏族自治州中级人民法院",
                    "value": "青海省海北藏族自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "青海省黄南藏族自治州中级人民法院",
                    "value": "青海省黄南藏族自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "青海省海南藏族自治州中级人民法院",
                    "value": "青海省海南藏族自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "青海省果洛藏族自治州中级人民法院",
                    "value": "青海省果洛藏族自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "青海省玉树藏族自治州中级人民法院",
                    "value": "青海省玉树藏族自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "青海省海西蒙古族藏族自治州中级人民法院",
                    "value": "青海省海西蒙古族藏族自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "西宁铁路运输法院",
                    "value": "西宁铁路运输法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "宁夏回族自治区高级人民法院",
            "value": "宁夏回族自治区高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "宁夏回族自治区银川市中级人民法院",
                    "value": "宁夏回族自治区银川市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "宁夏回族自治区石嘴山市中级人民法院",
                    "value": "宁夏回族自治区石嘴山市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "宁夏回族自治区吴忠市中级人民法院",
                    "value": "宁夏回族自治区吴忠市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "宁夏回族自治区固原市中级人民法院",
                    "value": "宁夏回族自治区固原市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "宁夏回族自治区中卫市中级人民法院",
                    "value": "宁夏回族自治区中卫市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "银川铁路运输法院",
                    "value": "银川铁路运输法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "新疆维吾尔自治区高级人民法院",
            "value": "新疆维吾尔自治区高级人民法院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "新疆维吾尔自治区乌鲁木齐市中级人民法院",
                    "value": "新疆维吾尔自治区乌鲁木齐市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "新疆维吾尔自治区克拉玛依市中级人民法院",
                    "value": "新疆维吾尔自治区克拉玛依市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "新疆维吾尔自治区吐鲁番市中级人民法院",
                    "value": "新疆维吾尔自治区吐鲁番市中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "新疆维吾尔自治区哈密地区中级人民法院",
                    "value": "新疆维吾尔自治区哈密地区中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "新疆维吾尔自治区昌吉回族自治州中级人民法院",
                    "value": "新疆维吾尔自治区昌吉回族自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "新疆维吾尔自治区博尔塔拉蒙古自治州中级人民法院",
                    "value": "新疆维吾尔自治区博尔塔拉蒙古自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "新疆维吾尔自治区巴音郭楞蒙古自治州中级人民法院",
                    "value": "新疆维吾尔自治区巴音郭楞蒙古自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "新疆维吾尔自治区阿克苏地区中级人民法院",
                    "value": "新疆维吾尔自治区阿克苏地区中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "新疆维吾尔自治区克孜勒苏柯尔克孜自治州中级人民法院",
                    "value": "新疆维吾尔自治区克孜勒苏柯尔克孜自治州中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "新疆维吾尔自治区喀什地区中级人民法院",
                    "value": "新疆维吾尔自治区喀什地区中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "新疆维吾尔自治区和田地区中级人民法院",
                    "value": "新疆维吾尔自治区和田地区中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "新疆维吾尔自治区高级人民法院伊犁哈萨克自治州分院",
                    "value": "新疆维吾尔自治区高级人民法院伊犁哈萨克自治州分院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "新疆维吾尔自治区伊犁哈萨克自治州塔城地区中级人民法院",
                    "value": "新疆维吾尔自治区伊犁哈萨克自治州塔城地区中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "新疆维吾尔自治区伊犁哈萨克自治州阿勒泰地区中级人民法院",
                    "value": "新疆维吾尔自治区伊犁哈萨克自治州阿勒泰地区中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "乌鲁木齐铁路运输中级法院",
                    "value": "乌鲁木齐铁路运输中级法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
        {
            "label": "新疆维吾尔自治区高级人民法院生产建设兵团分院",
            "value": "新疆维吾尔自治区高级人民法院生产建设兵团分院",
            "children": [
                { "label": "", "value": "" },
                {
                    "label": "新疆生产建设兵团第一师中级人民法院",
                    "value": "新疆生产建设兵团第一师中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "新疆生产建设兵团第二师中级人民法院",
                    "value": "新疆生产建设兵团第二师中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "新疆生产建设兵团第三师中级人民法院",
                    "value": "新疆生产建设兵团第三师中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "新疆生产建设兵团第四师中级人民法院",
                    "value": "新疆生产建设兵团第四师中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "新疆生产建设兵团第五师中级人民法院",
                    "value": "新疆生产建设兵团第五师中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "新疆生产建设兵团第六师中级人民法院",
                    "value": "新疆生产建设兵团第六师中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "新疆生产建设兵团第七师中级人民法院",
                    "value": "新疆生产建设兵团第七师中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "新疆生产建设兵团第八师中级人民法院",
                    "value": "新疆生产建设兵团第八师中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "新疆生产建设兵团第九师中级人民法院",
                    "value": "新疆生产建设兵团第九师中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "新疆生产建设兵团第十师中级人民法院",
                    "value": "新疆生产建设兵团第十师中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "新疆生产建设兵团第十二师中级人民法院",
                    "value": "新疆生产建设兵团第十二师中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "新疆生产建设兵团第十三师中级人民法院",
                    "value": "新疆生产建设兵团第十三师中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
                {
                    "label": "新疆生产建设兵团第十四师中级人民法院",
                    "value": "新疆生产建设兵团第十四师中级人民法院",
                    "children": [{ "label": "", "value": "" }],
                },
            ]
        },
    ];
};

/**
 * @description 诉讼案件明细默认配置
 */
export const columns = {
    reward: {
        items: [{
                title: '分配性质',
                dataIndex: 'type',
                key: 'type',
                scopedSlots: { customRender: 'name' },
            },
            {
                title: '发放期间',
                dataIndex: 'period',
                key: 'period',
            },
            {
                title: '员工姓名',
                dataIndex: 'username',
                key: 'username',
                ellipsis: true,
            },
            {
                title: '员工OA',
                dataIndex: 'account',
                key: 'account',
                ellipsis: true,
            },
            {
                title: '所属单位',
                dataIndex: 'company',
                key: 'company',
                ellipsis: true,
            },
            {
                title: '所属部门',
                dataIndex: 'department',
                key: 'department',
                ellipsis: true,
            },
            {
                title: '员工职务',
                dataIndex: 'position',
                key: 'position',
                ellipsis: true,
            },
            {
                title: '分配金额',
                dataIndex: 'amount',
                key: 'amount',
                ellipsis: true,
            },
        ],
        wfcolumns: [{
            title: '流程顺序',
            dataIndex: 'key',
            key: 'key',
            ellipsis: true,
        }, {
            title: '审批人员',
            dataIndex: 'username',
            key: 'username',
            ellipsis: true,
        }, {
            title: '审批账户',
            dataIndex: 'userid',
            key: 'userid',
            ellipsis: true,
        }, {
            title: '所属单位',
            dataIndex: 'company',
            key: 'company',
            ellipsis: true,
        }, {
            title: '所属部门',
            dataIndex: 'department',
            key: 'department',
            ellipsis: true,
        }, {
            title: '审批职务',
            dataIndex: 'position',
            key: 'position',
            ellipsis: true,
        }, {
            title: '联系电话',
            dataIndex: 'mobile',
            key: 'mobile',
            ellipsis: true,
        }, ],
    }
}

/**
 * @description 领用物品说明
 */
export const objects = {
    officeObjects: [
        '笔记本',
        '签字笔（黑）',
        '签字笔（红）',
        '订书机',
        '订书针',
        '回形针',
        'U盘',
        '笔筒',
        '便利贴',
        '标签贴',
        '彩色便签',
        '鼠标（有线）',
        '鼠标垫',
        '鼠标（无线）',
        '插板',
        '电池（5号）',
        '电池（7号）',
        '剪刀',
        '胶棒',
        '胶水',
        '透明文件袋',
        '美工刀',
        '燕尾夹（大号）',
        '燕尾夹（中号）',
        '燕尾夹（小号）',
        '抽杆文件夹',
        '牛皮档案袋',
        '牛皮档案盒',
        '塑料档案盒',
        '双面胶',
        '透明胶带',
        '橡皮擦',
        '铅笔',
        '荧光笔',
        '文件夹',
        '资料册',
        '文件架',
        '文件盘',
        '印泥',
        '起钉器',
        '名片夹',
        '派通笔',
        '中性笔',
        '名片盒',
        '计算器',
        '圆珠笔（黑）',
        '圆珠笔（红）',
        '彩色卡纸',
    ],
    drugObjects: [
        '感冒灵(999)',
        '板蓝根',
        '创口贴',
        '碘伏',
        '阿莫西林',
        '和香正气',
        '金嗓子',
        '元和正胃片',
        '蒙脱石散',
        '感康',
        '散列通',
        '棉签纱布',
    ],
};



/**
 * @description 暴露查询API接口
 */
export const queryAPI = {
    autoSerialAPI: 'https://api.yunwisdom.club:30443/api/v2/mysql/serial/bs_seal_regist/serialid/id',
    tableSerialAPI: 'https://api.yunwisdom.club:30443/api/v2/mysql/serial/{table_name}/serialid/id',
    patchSerialAPI: 'https://api.yunwisdom.club:30443/api/v2/mysql/patchserial/bs_seal_regist/serialid/id',
}

/**
 * @description 表单验证说明
 */
export const compValidation = {
    seal: {
        message: {
            filename: '',
            count: '',
            dealDepart: '',
            dealManager: '',
            dealMail: '',
            signman: '',
            workno: '',
            sealtype: '',
            ordertype: '',
            approveType: '',
            mobile: '',
            username: '',
            contractId: '',
            sealman: '',
            front: '',
            archive: '',
            prefix: '',
            meal_account: '',
            message: '',
            company: '',
            finance: '',
            record: '',
        },
        valid: {
            filename: '请输入文件名称！',
            count: '请输入文件份数！',
            dealDepart: '请输入经办部门！',
            dealManager: '请输入经办人!',
            dealMail: '请输入经办人邮箱!',
            signman: '请输入签收人！',
            workno: '请输入流程编号！',
            sealtype: '请选择用印类型！',
            ordertype: '请选择用印顺序！',
            approveType: '请输入审批类型！',
            mobile: '请输入经办人电话!',
            username: '请输入经办人的OA账号!',
            contractId: '请输入合同编号！',
            sealman: '请输入印章管理员(盖印人)！',
            front: '请输入前台人员名称！',
            archive: '请输入归档人员名称！',
            prefix: '请输入合同对应的编号前缀！',
            meal_account: '请输入新员工的食堂账户！',
            message: '请印章管理员输入用印意见或备注说明！',
            company: '请输入用印公司名称！',
            finance: '请输入财务归档人员！',
            record: '请输入档案归档人员！',
        },
    },
    entryjob: {
        message: {
            username: '',
            department: '', //入职岗位
            position: '', //入职岗位
            picture: '', //员工照片
            computer: '', //是否需要电脑配置
            seat: '', //是否需要办公座椅
            drawer: '', //是否需要办公抽屉drawer
            other_equip: '', //是否需要其他办公配置
            notebook: '', //是否需要笔记本子
            manual: '', //是否需要入职手册
            writingtools: '', //是否需要签字笔/擦
            badge: '', //员工工牌
            othertools: '', //其他用品
            driving_license: '', //行驶证
            driver_license: '', //驾驶证
            idcard: '', //身份证号
            diploma: '', //学历编号
            bachelor: '', //学位编号
            join_time: '', //入职时间
            hr_name: '', //对接HR
            bank_card: '',
            mobile: '',
            meal_account: '',
        },
        valid: {
            username: '请输入您的员工姓名！',
            department: '请输入您的入职部门！', //入职部门
            position: '请输入您的入职岗位！', //入职岗位
            picture: '请上传您的一寸照片！', //员工照片
            computer: '请选择是否需要电脑配置！', //是否需要电脑配置
            seat: '请选择是否需要办公座椅！', //是否需要办公座椅
            drawer: '请选择是否是否需要办公抽屉！', //是否需要办公抽屉drawer
            other_equip: '如果您有其他的办公配置要求，请填写在此处！', //是否需要其他办公配置
            notebook: '请选择是否需要笔记/记事本等！', //是否需要笔记本子
            manual: '请选择是否需要入职手册！', //是否需要入职手册
            writingtools: '请选择是否需要签字笔/擦！', //是否需要签字笔/擦
            badge: '请选择是否需要制作员工工牌！', //员工工牌
            othertools: '请输入您的其他办公用品需求！', //其他用品
            driving_license: '请输入您的行驶证编号！', //行驶证
            driver_license: '请输入您的驾驶证编号！', //驾驶证
            idcard: '请输入您的身份证编号！', //身份证号
            diploma: '请输入您的学历证件编号！', //学历编号
            bachelor: '请输入您的学位证件编号！', //学位编号
            join_time: '请选择您的入职时间！', //入职时间
            hr_name: '请选择您的对接HR姓名！', //对接HR
            bank_card: '请输入您的工资银行卡号！', //
            mobile: '请输入您的电话号码！', //
            meal_account: '请输入新员工的食堂账户！', //
        },
    },
    goodsreceive: {
        message: {
            create_time: '',
            create_by: '',
            receive_time: '', //领用时间
            user_admin_name: '',
            name: '', //领用物品名称
            amount: '', //领用数量
            receive_name: '', //领用人员名称
            department: '', //领用部门名称
            remark: '', //备注说明
            type: '', //领用类别
            company: '', //单位名称
        },
        valid: {
            create_time: '请输入登记时间！',
            create_by: '请输入登记人员！',
            receive_time: '请输入领用时间！', //领用时间
            user_admin_name: '请输入物品领用管理员！',
            name: '请输入领用物品名称！', //领用物品名称
            amount: '请输入领用物品数量及单位！', //领用数量
            receive_name: '请输入领用人员姓名！', //领用人员名称
            department: '请输入领用人员所属部门！', //领用部门名称
            remark: '请输入领用备注说明！', //备注说明
            type: '请输入领用类别！', //领用类别
            company: '请输入领用人员所属单位/公司名称！', //单位名称
        }
    },
    borrowreceive: {
        message: {
            create_time: '',
            create_by: '',
            receive_time: '', //领用时间
            user_admin_name: '',
            name: '', //领用物品名称
            amount: '', //领用数量
            receive_name: '', //领用人员名称
            department: '', //领用部门名称
            remark: '', //备注说明
            type: '', //领用类别
            company: '', //单位名称
        },
        valid: {
            create_time: '请输入登记时间！',
            create_by: '请输入登记人员！',
            receive_time: '请输入物品借用时间！', //领用时间
            user_admin_name: '请输入物品借用管理员！',
            name: '请输入借用物品/设备名称！', //领用物品名称
            amount: '请输入借用物品/设备数量及单位！', //领用数量
            receive_name: '请输入借用人员姓名！', //领用人员名称
            department: '请输入借用人员所属部门！', //领用部门名称
            remark: '请输入物品借用备注说明！', //备注说明
            type: '请输入物品借用类别！', //领用类别
            company: '请输入借用人员所属单位/公司名称！', //单位名称
        }
    },
    lostproperty: {
        message: {
            lost_name: '', //领用物品名称
            lost_amount: '', //领用数量
            user_admin_name: '',
        },
        valid: {
            lost_name: '请输入物品名称！', //领用物品名称
            lost_amount: '请输入物品数量及单位！', //领用数量
            user_admin_name: '请输入失物招领处的物品管理员姓名！',
        }
    },
    visitorapply: {
        message: {
            time: '',
            visitor_name: '',
            visitor_company: '',
            visitor_mobile: '',
            visitor_position: '',
            visitor_name1: '',
            visitor_mobile1: '',
            visitor_name2: '',
            visitor_mobile2: '',
            visitor_name3: '',
            visitor_mobile3: '',
            visitor_name4: '',
            visitor_mobile4: '',
            visitor_name5: '',
            visitor_mobile5: '',
            visitor_name6: '',
            visitor_mobile6: '',
            visitor_name7: '',
            visitor_mobile7: '',
            visitor_name8: '',
            visitor_mobile8: '',
            visitor_name9: '',
            visitor_mobile9: '',
            visitor_name10: '',
            visitor_mobile10: '',
            visitor_name11: '',
            visitor_mobile11: '',
            visitor_name12: '',
            visitor_mobile12: '',
            visitor_name13: '',
            visitor_mobile13: '',
            visitor_name14: '',
            visitor_mobile14: '',
            visitor_name15: '',
            visitor_mobile15: '',
            visitor_name16: '',
            visitor_mobile16: '',
            visitor_name17: '',
            visitor_mobile17: '',
            visitor_name18: '',
            visitor_mobile18: '',
            visitor_name19: '',
            visitor_mobile19: '',
            visitor_name20: '',
            visitor_mobile20: '',
            employee: '',
            mobile: '',
            position: '',
            user_admin_name: '',
        },
        valid: {
            time: '请输入预约时间！',
            visitor_name: '请输入访客姓名！',
            visitor_company: '请输入访客单位名称！',
            visitor_mobile: '请输入访客电话！',
            visitor_position: '请输入访客职务！',
            visitor_name1: '请输入访客姓名！',
            visitor_mobile1: '请输入访客电话！',
            visitor_name2: '请输入访客姓名！',
            visitor_mobile2: '请输入访客电话！',
            visitor_name3: '请输入访客姓名！',
            visitor_mobile3: '请输入访客电话！',
            visitor_name4: '请输入访客姓名！',
            visitor_mobile4: '请输入访客电话！',
            visitor_name5: '请输入访客姓名！',
            visitor_mobile5: '请输入访客电话！',
            visitor_name6: '请输入访客姓名！',
            visitor_mobile6: '请输入访客电话！',
            visitor_name7: '请输入访客姓名！',
            visitor_mobile7: '请输入访客电话！',
            visitor_name8: '请输入访客姓名！',
            visitor_mobile8: '请输入访客电话！',
            visitor_name9: '请输入访客姓名！',
            visitor_mobile9: '请输入访客电话！',
            visitor_name10: '请输入访客姓名！',
            visitor_mobile10: '请输入访客电话！',
            visitor_name11: '请输入访客姓名！',
            visitor_mobile11: '请输入访客电话！',
            visitor_name12: '请输入访客姓名！',
            visitor_mobile12: '请输入访客电话！',
            visitor_name13: '请输入访客姓名！',
            visitor_mobile13: '请输入访客电话！',
            visitor_name14: '请输入访客姓名！',
            visitor_mobile14: '请输入访客电话！',
            visitor_name15: '请输入访客姓名！',
            visitor_mobile15: '请输入访客电话！',
            visitor_name16: '请输入访客姓名！',
            visitor_mobile16: '请输入访客电话！',
            visitor_name17: '请输入访客姓名！',
            visitor_mobile17: '请输入访客电话！',
            visitor_name18: '请输入访客姓名！',
            visitor_mobile18: '请输入访客电话！',
            visitor_name19: '请输入访客姓名！',
            visitor_mobile19: '请输入访客电话！',
            visitor_name20: '请输入访客姓名！',
            visitor_mobile20: '请输入访客电话！',
            employee: '请输入填报人姓名！',
            mobile: '请输入填报人电话！',
            position: '请输入填报人职务！',
            user_admin_name: '请输入客服接待！',
        },
    },
    legalapply: {
        message: {
            title: '',
            company: '',
            department: '',
            content: '',
            remark: '', //备注
            amount: '',
            reward_type: '',
            reward_name: '',
            reward_period: '',
            hr_name: '',
            files: '',
            apply_realname: '',
        },
        valid: {
            title: '请输入案件审批的标题！',
            company: '请输入申请人员的所在公司！',
            department: '请输入申请人员的所在部门！',
            content: '请输入案件审批流程的申请事由！',
            remark: '请输入备注信息！', //备注
            amount: '请输入本次案件审批的单项奖金总额！',
            reward_type: '请输入诉讼案件类型！',
            reward_name: '请输入诉讼案件名称！',
            reward_period: '请输入诉讼案件所属周期！',
            hr_name: '请输入负责薪资管理的人力经理！',
            files: '请上传诉讼案件明细的Excel文档！',
            apply_realname: '请输入申请人姓名！',
        }
    },
    firmapply: {
        message: {
            title: '',
            create_by: '',
            in_zone: '',
            firm_name: '',
            in_time: '',
            tags: '',
            plate: '',
            establish_time: '',
            address: '',
            phone: '',
            scale: '',
            brief: '',
            firm_count: '',
            team_brief: '',
            fee: '',
            major_fee: '',
            common_fee: '',
            diligence_fee: '',
            notice_fee: '',
            penal_fee: '',
            coop_flag: '',
            out_flag: '',
        },
        valid: {
            title: '请输入流程标题！',
            create_by: '请输入填报人员！',
            in_zone: '请输入所属区域！',
            firm_name: '请输入律所名称！',
            in_time: '请选择入库时间！',
            tags: '请选择律所业务标签！',
            plate: '请选择律所业务板块！',
            establish_time: '请输入成立日期！',
            address: '请输入律所所在地址！',
            phone: '请输入律所联系电话！',
            scale: '请选择律所规模大小！',
            brief: '请输入律所简介！',
            firm_count: '请输入律所服务团队人数！',
            team_brief: '请输入律所服务团队简介！',
            fee: '请输入律所常务法律费用！',
            major_fee: '请输入律所重大诉讼费用！',
            common_fee: '请输入律所一般诉讼费用！',
            diligence_fee: '请输入律所尽调专项费用！',
            notice_fee: '',
            penal_fee: '',
            coop_flag: '',
            out_flag: '',
        }
    }
}

/**
 * @param {*} 普通用户 (扫码用户)
 */
export const commonUserInfo = { username: 'common', realname: '', main_department: '', department: { name: '' }, parent_company: { name: '' }, };

/**
 * @description 左侧菜单列表
 */
export function getPaneflows(that) {
    return [{
            id: 100,
            name: "我的知会",
            ename: "myrewardlist",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/xdata-stock-service@v1.0.5/src/assets/img/liebiao_jy.png`,
            href: "/account/myrewardlist",
            description: "查看我的案件审批知会流程",
            show: true,
            css: "",
            all: '全部',
            periodTabsFlag: false,
            tabs: ['全部', '待审批', '审批中', '已完成', '已驳回'],
            dataSource: [],
            click: () => {
                that.panename = 'myrewardlist';
            },
        }, {
            id: 200,
            name: "我的待办",
            ename: "mytodolist",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/time_00.png`,
            href: "/account/mytodolist",
            description: "查看待处理的案件审批流程",
            show: true,
            css: "",
            all: '全部',
            periodTabsFlag: false,
            tabs: ['全部', '待审批', '知会我'],
            dataSource: [],
            click: () => {
                that.panename = 'mytodolist';
            },
        },
        {
            id: 300,
            name: "我的已办",
            ename: "mydonelist",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/home_00.png`,
            href: "/account/mydonelist",
            description: "查看已处理的案件审批流程",
            show: true,
            css: "",
            all: '全部',
            periodTabsFlag: false,
            tabs: ['全部', '我发起', '已审批', '已驳回', '知会我'],
            dataSource: [],
            click: () => {
                that.panename = 'mydonelist';
            },
        },
        {
            id: 400,
            name: "我的申请",
            ename: "myapplylist",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/hire.png`,
            href: "/account/myapplylist",
            description: "查看我发起的案件审批流程",
            show: true,
            css: "",
            all: '全部',
            periodTabsFlag: false,
            tabs: ['全部', '待审批', '审批中', '已完成', '已驳回'],
            dataSource: [],
            click: () => {
                that.panename = 'myapplylist';
            },
        },
    ];
}