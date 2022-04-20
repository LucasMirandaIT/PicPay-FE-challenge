import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";

import "./LoginPage.css";
import loginLogo from "../../assets/login_payment.svg";
import logoBlue from "../../assets/logo_blue.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = (props) => {
  const { setAuthenticatedUser } = useContext(AuthContext);

  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    axios.get("/account").then(({ data }) => {
      let filteredArray = data.filter(
        (user) => user.email === email && user.password === password
      );
      if (filteredArray[0]) {
        setAuthenticatedUser(filteredArray[0]);
        navigate("/");
      } else {
        console.log("Nenhum usuário encontrado com estas credenciais");
      }
    });
  };

  return (
    <div className="login-container">
      <section className="login-box">
        <div className="form">
          <div className="product-container">
            <img
              src={logoBlue}
              width="154px"
              alt="PayFriends logo"
              style={{ marginBottom: "18px" }}
            />
            <span className="welcome-text">{t("global:welcomeText")}</span>
          </div>
          <TextField
            id="login-input"
            data-testid="email-input"
            label={t("global:emailLabel")}
            value={email}
            defaultValue={email}
            onChange={({ target: { value } }) => setEmail(value)}
            variant="outlined"
          />
          <OutlinedInput
            id="psswd-input"
            data-testid="password-input"
            placeholder={t("global:passwordLabel")}
            onChange={({ target: { value } }) => setPassword(value)}
            type={showPassword ? "text" : "password"}
            sx={{ marginTop: "28px" }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  data-testid="show-password-button"
                  onMouseDown={handleClickShowPassword}
                  onMouseUp={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Button
            variant="contained"
            data-testid="login-button"
            onClick={handleLogin}
            sx={{
              marginTop: "36px",
              height: "36px",
              padding: "10px 14px",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "16px",
            }}
          >
            {t('global:loginButtonLabel')}
          </Button>
        </div>
      </section>

      <section className="loginLogo-container">
        <img
          src={loginLogo}
          className="logo"
          alt="Man doing payment via cellphone"
        />
      </section>
    </div>
  );
};

export default Login;
