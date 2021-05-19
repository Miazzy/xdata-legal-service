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
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r3.0.1/images/pay03.png`,
            href: "/account/todolist",
            description: '公司主动起诉案件发起申请',
            click: () => {
                $router.push(`/legal/legalapply?type=0&legalTname=起诉`, '_blank');
            }
        }, {
            name: "应诉案件发起",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/pay.png`,
            href: "/account/donelist",
            description: '公司应诉案件发起申请',
            click: () => {
                $router.push(`/legal/legalapply?type=1&legalTname=应诉`, '_blank');
            }
        }, {
            name: "案件管理",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r3.0.0/images/pay02.png`,
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
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r3.0.0/images/pay00.png`,
            href: "/account/myrewards",
            description: '对案件进展处于一审阶段的案件进行管理',
            click: () => {
                // $router.push(`/legal/legalapply?type=3&reward_name=特殊贡献`, '_blank');
            },
        }, {
            name: "二审管理",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r3.0.2/images/pay07.png`,
            href: "/account/myanalyse",
            description: '对案件进展处于二审阶段的案件进行管理',
            click: () => {
                // $router.push(`/legal/legalapply?type=4&reward_name=其他诉讼案件`, '_blank');
            },
        }, {
            name: "执行管理",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/yuebao.png`,
            href: "/account/myanalyse",
            description: '对案件进展处于执行阶段的案件进行管理',
            click: () => {
                // $router.push(`/legal/legalmonth?type=month`);
            },
        }, {
            name: "再审管理",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/ribao.png`,
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
            in_zone: '', // varchar(32)  default ''  not null comment '入库区域',
            firm_name: '', // varchar(64)  default ''  not null comment '律所名称',
            in_time: '', // varchar(32)  default ''  not null comment '入库时间',
            tags: '',
            plate: '',
            establish_time: '', // varchar(32)  default ''  not null comment '成立时间',
            address: '', // varchar(64)  default ''  not null comment '地址',
            phone: '', // varchar(16)  default ''  not null comment '电话',
            scale: '1-10人', // varchar(16)  default ''  not null comment '律所规模（人数）',
            brief: '', // varchar(256) default ''  not null comment '律所简要介绍',
            firm_count: 'N人', // varchar(16)  default ''  not null comment '服务团队人数',
            team_brief: '', // varchar(256) default ''  not null comment '团队介绍',
            fee: '￥N万/年', // varchar(64)  default ''  not null comment '费用',
            major_fee: '一事一议', // varchar(64)  default ''  not null comment '重大诉讼费用',
            common_fee: '商品房纠纷案件：￥N/件', // varchar(64)  default ''  not null comment '一般诉讼费用',
            diligence_fee: '￥N万/项目', // varchar(64)  default ''  not null comment '尽调专项费用',
            notice_fee: '￥N万/年', // varchar(64)  default ''  not null comment '发函专项费用',
            penal_fee: '一事一议', // varchar(64)  default ''  not null comment '刑事专项费用',
            coop_flag: '已合作', // varchar(1)   default 'Y' not null comment '是否已合作',
            start_time: '', // varchar(32)  default ''  not null comment '开始合作时间',
            coop_time: '', // varchar(32)  default ''  not null comment '最近合作期间',
            coop_stime: '', // varchar(32)  default ''  not null comment '最近合作期间(开始时间)',
            coop_etime: '', // varchar(32)  default ''  not null comment '最近合作期间(结束时间)',
            out_flag: '未出库', // varchar(32)  default 'N' not null comment '是否出库',
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
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/shenpi.png`,
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