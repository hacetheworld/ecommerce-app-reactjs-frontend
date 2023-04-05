import "./Homepage.css";
import { HomePageTopProduct } from "../components/HomePageTopProduct";
import { HomePageHero } from "../components/HomePageHero";
export const HomePage = () => {
  return (
    <>
      <HomePageHero />
      <HomePageTopProduct />
    </>
  );
};
