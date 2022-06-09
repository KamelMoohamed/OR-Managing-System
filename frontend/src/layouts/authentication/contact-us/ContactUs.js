import { useContext, useState } from "react";

// react-router-dom components
// @mui material components
// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import doors from "assets/images/pexels-skylar-kang-6207368.jpg";

// Images
import { useHttpClient } from "../../../Hooks/http-hook";
import { AuthContext } from "../../../context/index";

function ContactUs() {
  const [name, setName] = useState({ target: { value: "" } });
  const [email, setEmail] = useState({ target: { value: "" } });
  const [message, setMessage] = useState({ target: { value: "" } });

  const nameHandler = (p) => setName(p);
  const emailHandler = (p) => setEmail(p);
  const messageHandler = (p) => setMessage(p);

  const onClickHandler = (ob) => {
    return async (event) => {
      event.preventDefault();
      console.log(ob);
      try {
        const res = await fetch("http://localhost:8000/api/v1/complain", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Name: ob.name,
            email: ob.email,
            complainText: ob.message,
          }),
        });
        const resData = await res.json();
        if (resData === "fail") {
          alert(resData.message);
        }
      } catch (err) {
        console.log(err);
      }
    };
  };

  return (
    <CoverLayout title="Contact Us" description="We Would like to hear from you" image={doors}>
      <SuiBox component="form" role="form">
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Name
            </SuiTypography>
          </SuiBox>

          <SuiInput type="text" placeholder="Email" onChange={nameHandler} />
        </SuiBox>
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SuiTypography>
          </SuiBox>

          <SuiBox mb={2}>
            <SuiInput type="email" placeholder="Email" onChange={emailHandler} />
          </SuiBox>
        </SuiBox>

        <SuiBox mb={2}>
          <SuiTypography component="label" variant="caption" fontWeight="bold">
            Message
          </SuiTypography>
        </SuiBox>

        <SuiBox mb={2}>
          <SuiInput
            type="text"
            placeholder="message"
            multiline
            rows={5}
            onChange={messageHandler}
          />
        </SuiBox>

        <SuiBox mt={4} mb={1}>
          <SuiButton
            variant="gradient"
            color="info"
            fullWidth
            onClick={onClickHandler({
              name: name.target.value,
              email: email.target.value,
              message: message.target.value,
            })}
          >
            Send
          </SuiButton>
        </SuiBox>
      </SuiBox>
    </CoverLayout>
  );
}

export default ContactUs;
