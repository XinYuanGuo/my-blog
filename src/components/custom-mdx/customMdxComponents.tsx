/**
 * 自定义MDX组件
 */

import {
  CustomH1,
  CustomH2,
  CustomH3,
  CustomH4,
  CustomH5,
  CustomH6,
} from "./CustomHeading";
import CustomLink from "./CustomLink";
import CustomPre from "./CustomPre";

const customMdxComponents = {
  pre: CustomPre,
  h1: CustomH1,
  h2: CustomH2,
  h3: CustomH3,
  h4: CustomH4,
  h5: CustomH5,
  h6: CustomH6,
  a: CustomLink,
};

export default customMdxComponents;
