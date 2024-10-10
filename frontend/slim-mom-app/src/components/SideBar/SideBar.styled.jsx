import styled from "styled-components";
import TabletBgLeaves from "../../assets/images/diary-page/leaf-tablet.png";

export const Wrapper = styled.div`
  background-color: #f0f1f3;
  padding: 40px 20px 84px;

  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 80px 0 80px 32px;
    display: flex;
    background-image: url(${TabletBgLeaves});
    background-repeat: no-repeat;
    background-position: bottom left 385px;
    background-size: auto;
  }

  @media (min-width: 1024px) {
    background-color: transparent;
    padding: 0;
    margin-right: 55px;
  }

  @media (min-width: 1121px) {
    margin-right: 105px;
    padding: 0;
  }
`;

export const SummaryWrap = styled.div`
  width: 280px;
  margin: 0 auto 40px;

  @media (min-width: 768px) {
    width: 288px;
    margin: 0;
    margin-right: 80px;
  }

  @media (min-width: 1024px) {
    margin-bottom: 60px;
  }
`;

export const FoodWrap = styled.div`
  width: 280px;
  margin: 0 auto;

  @media (min-width: 768px) {
    margin: 0;
  }
`;

export const Title = styled.h3`
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0.04em;
  margin-bottom: 20px;
`;

export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Text = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.04em;
  color: #9b9faa;
`;

export const RedText = styled(Text)`
  color: #fd0000;
`;
