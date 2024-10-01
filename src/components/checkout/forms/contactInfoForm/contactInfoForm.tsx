import { emailRegExp } from "../../../../utils/constant";
import { TextFieldControl } from "../../../common/textfield";


const contactInfoForm = () => {
  return (
    <section
      aria-labelledby="contact-info-heading"
      style={{ marginTop: 10, marginBottom: 40 }}
    >
      <TextFieldControl
        name="CustomerData.email"
        className="mt-5"
        placeholder="Email"
        aria-label="Email"
        rules={{
          required: "Please enter your email address",
          pattern: {
            value: emailRegExp,
            message: "Please enter a valid email address",
          },
        }}
      />
    </section>
  );
};

export default contactInfoForm;
