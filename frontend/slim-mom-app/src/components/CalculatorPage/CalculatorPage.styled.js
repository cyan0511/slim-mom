import styled from "styled-components";
import leaves from "../../assets/images/diary-page/leaf-desk.png";
import TabletBgLeaves from "../../assets/images/hero/tablet/leaves.png";
import SideBarMenu from "../../assets/images/diary-page/sidebar-bg-desk.png";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 300px 16px 55px;
  background-repeat: no-repeat;

  @media (min-width: 768px) {
    background-image: url(${TabletBgLeaves});
    background-position: bottom left;
  }

  @media (min-width: 1024px) {
    height: 100vh;
    background-image: url(${leaves}), url(${SideBarMenu});
    background-position: top right, top right;
    background-size: auto, 40% 100%;
  }

  @media (max-width: 1120px) {
    background-position: top right, top right -110px;
    background-size: auto, 50% 100%;
  }

  @media (min-width: 1121px) {
    margin: 0 auto;
  }
`;

export const CalculatorWrapper = styled.div`
  padding: 32px 20px 100px;

  @media (min-width: 426px) {
    padding: 100px 32px 48px;
  }

  @media (min-width: 1024px) {
    padding: 0 16px 110px;
  }
`;

export const H2 = styled.h2`
  line-height: 1.4;
  margin-bottom: 34px;
  color: ${(p) => p.theme.colors.black};
  font-size: clamp(1.5rem, 4vw, ${(p) => p.theme.fontSizes[1]});

  @media (min-width: 426px) {
    margin-bottom: 68px;
    max-width: 635px;
  }
`;
