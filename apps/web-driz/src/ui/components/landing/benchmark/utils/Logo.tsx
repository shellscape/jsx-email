import { type FC } from "react";
import DrizzleLogo from "@/assets/icons/DrizzleLogo";
import PrismaIcon from "@/assets/icons/PrismaIcon";
import GoIcon from "@/assets/icons/GoIcon";

interface Props {
  logo: string;
}

const Logo: FC<Props> = ({ logo }) => {
  if (logo.startsWith("drizzle")) {
    return <DrizzleLogo />;
  }
  if (logo.startsWith("prisma")) {
    return <PrismaIcon />;
  }
  if (logo.startsWith("go")) {
    return <GoIcon />;
  }
  return null;
};

export default Logo;
