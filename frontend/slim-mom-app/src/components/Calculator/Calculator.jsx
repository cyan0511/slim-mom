import React from "react";
import css from "../Calculator/Calculator.module.css";
import { Typography, Box, MenuList, Button } from "@mui/material";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/authOperations";

export const Calculator = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const user = authState?.user?.data || {};
  const { name, avatarUrl, infouser } = user;
  const { notAllowedProducts = [], dailyRate = 0 } = infouser || {};

  const myProductsState = useSelector((state) => state.myproducts);
  const dates = myProductsState?.products?.dates || [];
  const currentDateWithTime = new Date().toISOString().split("T")[0]; // Simplified date generation
  const currentDateProducts = dates.filter(
    (entry) => entry.date === currentDateWithTime
  );

  const newCaloriesArray = currentDateProducts.flatMap((entry) =>
    entry.products.map((p) => p.newCalories)
  );
  const consumed = newCaloriesArray.reduce(
    (total, calories) => total + calories,
    0
  );
  const left = dailyRate - consumed;
  const consumedPercentage = Math.round((consumed * 100) / dailyRate) || 0;

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/SlimMom");
  };

  const renderProductList = () =>
    notAllowedProducts.length > 0 ? (
      notAllowedProducts.map((product, index) => <li key={index}>{product}</li>)
    ) : (
      <li>No products found</li>
    );

  return (
    <div className={css.calculator}>
      <Box>
        <MenuList
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            justifyContent: "flex-end",
          }}
        >
          <li>
            <Box
              sx={{
                borderRadius: "50%",
                backgroundColor: "#FC842D",
                padding: "3px",
              }}
            >
              <img
                src={avatarUrl}
                alt="Avatar"
                width={40}
                style={{ borderRadius: "50%" }}
              />
            </Box>
          </li>
          <li>
            <Typography
              sx={{ fontWeight: "700", fontSize: "14px", color: "#212121" }}
            >
              {name}
            </Typography>
          </li>
          <li>
            <HorizontalRuleRoundedIcon
              sx={{ transform: "rotate(90deg)", color: "#9b9faa" }}
            />
          </li>
          <li>
            <Button onClick={handleLogout}>
              <Typography
                sx={{ fontWeight: "700", fontSize: "14px", color: "#9b9faa" }}
              >
                Exit
              </Typography>
            </Button>
          </li>
        </MenuList>
      </Box>
      <Box>
        <Typography
          sx={{ fontWeight: "700", fontSize: "26px", color: "#212121" }}
        >
          Summary for {new Date().toLocaleDateString("en-GB")}
        </Typography>
        <MenuList
          sx={{
            width: "330px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <li className={css.list}>
            <Typography sx={{ color: "#9b9faa" }}>Left</Typography>
            <span className={css.span}>{left} kcal</span>
          </li>
          <li className={css.list}>
            <Typography sx={{ color: "#9b9faa" }}>Consumed</Typography>
            <span className={css.span}>{Math.round(consumed)} kcal</span>
          </li>
          <li className={css.list}>
            <Typography sx={{ color: "#9b9faa" }}>Daily rate</Typography>
            <span className={css.span}>{dailyRate} kcal</span>
          </li>
          <li className={css.list}>
            <Typography sx={{ color: "#9b9faa" }}>n% of normal</Typography>
            <span className={css.span}>{consumedPercentage}% kcal</span>
          </li>
        </MenuList>
      </Box>
      <Box>
        <Typography
          sx={{ fontWeight: "700", fontSize: "26px", color: "#212121" }}
        >
          Food not recommended
        </Typography>
        <MenuList sx={{ width: "330px", gap: "10px", color: "#9b9faa" }}>
          {renderProductList()}
        </MenuList>
      </Box>
    </div>
  );
};
