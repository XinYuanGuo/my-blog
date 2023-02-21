import {
  HomeIcon,
  LightBulbIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { Action, KBarProvider, Priority } from "kbar";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";
import { Theme } from "../ThemeSwitch";
import CommandBar from "./CommandBar";

const CommandPalette: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const router = useRouter();
  const { setTheme } = useTheme();
  const actions: Action[] = [
    // page section
    {
      id: "home",
      name: "首页",
      keywords: "home homepage index 首页",
      perform: () => router.push("/"),
      icon: <HomeIcon className="h-6 w-6" />,
      section: {
        name: "页面",
        priority: Priority.HIGH,
      },
    },
    // operation section
    {
      id: "theme",
      name: "切换主题",
      keywords: "change toggle theme mode color 切换 更换 颜色 主题 模式",
      icon: <LightBulbIcon className="h-6 w-6" />,
      section: "操作",
    },
    {
      id: "theme-light",
      name: "明亮模式",
      keywords: "theme light white mode color 颜色 主题 模式 明亮 白色",
      perform: () => setTheme(Theme.LIGHT),
      icon: <SunIcon className="h-6 w-6" />,
      parent: "theme",
      section: "操作",
    },
    {
      id: "theme-dark",
      name: "暗黑模式",
      keywords: "theme dark black mode color 颜色 主题 模式 暗黑 黑色 深夜",
      perform: () => setTheme(Theme.DARK),
      icon: <MoonIcon className="h-6 w-6" />,
      parent: "theme",
      section: "操作",
    },
  ];

  return (
    <KBarProvider actions={actions}>
      <CommandBar />
      {children}
    </KBarProvider>
  );
};

export default CommandPalette;
