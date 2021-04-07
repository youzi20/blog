import { MenuTypes } from '@/types'

const MenuLink = (name) => "/" + name;
const PathName = location.pathname;
export const MenusEnum = [
    { name: "文章", link: MenuLink(MenuTypes.NEWS), match: ["/", "/news"].indexOf(PathName) > -1 },
    { name: "随记", link: MenuLink(MenuTypes.NOTES), match: ["/notes"].indexOf(PathName) > -1 },
    { name: "工具", link: MenuLink(MenuTypes.TOOLS), match: ["/tools"].indexOf(PathName) > -1 },
    { name: "留言板", link: MenuLink(MenuTypes.MESSAGES), match: ["/messages"].indexOf(PathName) > -1 },
    // { name: "组件", value: "module" }
]

export const SidebarEnum = [
    { text: "交换友链", icon: "youzi_link" },
    { text: "留言", icon: "youzi_message" },
    { text: "回到顶部", icon: "youzi_top" },
]