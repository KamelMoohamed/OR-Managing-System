import React from "react";
import Input from "../../../Shared/FormElements/Input";
import Button from "../../../Shared/FormElements/Button";
import Card from "../../../Shared/UIElements/Card";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../../../Shared/utils/validators";

const EditProfile = () => {
  return (
    <Card className="login">
      <form>
        <label>Your Name</label>
        <Button type="submit" disabled={true}>
          Edit
        </Button>
      </form>
    </Card>
  );
};

export default EditProfile;
