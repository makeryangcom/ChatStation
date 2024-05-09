export default {
    header: {
        left: {
            placeholder: "选择连接方式",
            search: "搜索关键词...",
            search_no_found: "没有相关数据",
            browser: "游览器",
            local: "本地",
            remote: "远程",
            new_remote: "新的远程设备"
        },
        tab: {
            chat: "对话",
            workflow: "工作流",
            agent: "智能体",
            database: "数据库",
            extension: "扩展"
        },
        account: {
            menu: {
                profile: "用户中心",
                billing: "账单",
                settings: "设置",
                logout: "退出"
            }
        }
    },
    chat: {
        new: "新建对话",
        time: {
            today: "今天",
            history: "历史",
            search: "选择搜索时间范围..."
        },
        search: {
            placeholder: "搜索关键词..."
        },
        form: {
            placeholder: "发消息给AI...",
            button: "发送消息"
        },
        configuration: {
            workflow: {
                title: "工作流",
                placeholder: "选择要使用的工作流...",
                tips: "在对话中使用自定义工作流，通过强大的工作流处理更复杂的任务。"
            },
            model: {
                title: "模型",
                placeholder: "选择要使用的模型...",
                tips: "根据自己的需求和场景，在对话中指定要使用对话模型。"
            },
            settings: {
                title: "设置",
                presets: {
                    creative: "创意",
                    balanced: "平衡",
                    precise: "精准"
                },
                temperature: {
                    title: "温度",
                    tips: "控制随机性：降低温度会导致生成的内容变得不那么随机。当温度接近零时，模型将变得确定性强和重复性高。"
                },
                maxlength: {
                    title: "最大令牌数",
                    tips: "生成的最大令牌数是提示和完成之间共享的。具体限制因模型而异。（一个令牌大约相当于标准英文文本的4个字符）。"
                },
                top_p: {
                    title: "采样多样性",
                    tips: "通过核采样控制多样性：0.5表示考虑所有按概率加权的选项中的一半。"
                },
                frequency_penalty: {
                    title: "惩罚频率",
                    tips: "根据目前文本中已有的频率对新词汇进行多大程度的惩罚。这样可以降低模型重复相同行内容的可能性。"
                },
                presence_penalty: {
                    title: "存在惩罚",
                    tips: "根据新词汇是否出现在目前的文本中来决定对其进行多大程度的惩罚。这样可以增加模型谈论新话题的可能性"
                }
            }
        }
    },
    workflow: {
        new: "新建工作流",
        tag: {
            all: "全部",
            hot: "热门",
            new: "最新",
            user: "我的"
        },
        search: {
            placeholder: "搜索关键词..."
        }
    },
    agent: {
        new: "新建智能体",
        tag: {
            all: "全部",
            hot: "热门",
            new: "最新",
            user: "我的"
        },
        search: {
            placeholder: "搜索关键词..."
        }
    },
    install: {
        title: "快速开始",
        description: "选择一种方式，快速启动你的AI助手。",
        tab: {
            browser: {
                title: "游览器",
                heads_up: "提醒!!!",
                tips: "内置游览器可解决大部分AI应用站点网页无法访问的问题。",
                button: "进入游览器"
            },
            local: {
                title: "本机",
                placeholder: "选择一个位置用于存储数据",
                heads_up: "提醒!!!",
                tips: "本地大模型资源占用空间较大，应保留足够的空间存储这些资源，建议 ≥ 30GB。",
                button: "开始安装和部署"
            },
            remote: {
                title: "远程",
                placeholder: "输入远程设备的域名或IP地址",
                heads_up: "提醒!!!",
                tips: "请确保远程设备已经安装部署了相关的大模型服务，否则请前往官方获取安装方式。",
                button: "连接远程设备"
            }
        }
    },
    toast: {
        20001: "信息不完整，请检查。",
        30001: "当前路径剩余存储空间不足",
        30002: "系统路径异常",
        30003: "安装部署失败，请重新尝试",
    }
}