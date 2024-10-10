import { useSelector } from "react-redux";
import {
  Wrapper,
  SummaryWrap,
  FoodWrap,
  Title,
  Item,
  Text,
  RedText,
} from "./SideBar.styled";

export const SideBar = () => {
  const date = useSelector((state) => state.products.date);
  const dailyRate = useSelector((state) => state.auth.userInfo?.dailyRate) || 0;
  const notAllowedProducts = useSelector(
    (state) => state.auth.userInfo?.notAllowedProducts
  );
  const productsList =
    useSelector((state) => state.products.productsList) || [];

  const totalCalories = productsList.reduce(
    (prev, product) => prev + Number.parseInt(product.productCalories || 0, 10),
    0
  );
  const leftCalories = dailyRate - totalCalories;
  const nOfNorm = (totalCalories / dailyRate) * 100;

  return (
    <Wrapper>
      <SummaryWrap>
        <Title>Summary for {date}</Title>
        <ul>
          <Item>
            <Text>Left</Text>
            {leftCalories < 0 ? (
              <RedText>{leftCalories} kcal</RedText>
            ) : (
              <Text>{leftCalories || "000"} kcal</Text>
            )}
          </Item>
          <Item>
            <Text>Consumed</Text>
            <Text>{totalCalories || "000"} kcal</Text>
          </Item>
          <Item>
            <Text>Daily rate</Text>
            <Text>{dailyRate || "000"} kcal</Text>
          </Item>
          <Item>
            <Text>n% of normal</Text>
            {nOfNorm > 100 ? (
              <RedText>{Math.round(nOfNorm)} %</RedText>
            ) : (
              <Text>{Math.round(nOfNorm) || "0"} %</Text>
            )}
          </Item>
        </ul>
      </SummaryWrap>

      <FoodWrap>
        <Title>Food not recommended</Title>
        {notAllowedProducts?.length ? (
          <ul>
            {notAllowedProducts.map((prod, index) => (
              <Text key={index}>
                {index + 1}. {prod}
              </Text>
            ))}
          </ul>
        ) : (
          <Text>Your diet will be displayed here</Text>
        )}
      </FoodWrap>
    </Wrapper>
  );
};
