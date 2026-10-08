import LeadFormFields from "@/app/_components/LeadForm/LeadFormFields";

const HeroForm = () => {
  return (
    <div className="hero-form">
      <div className="hero-form-card">
        <h2 className="hero-form-title">Get A Free Quote</h2>
        <p className="hero-form-desc">
          Tell us about your app idea. We reply within one business day.
        </p>
        <LeadFormFields idPrefix="hero" buttonLabel="Get My Free Quote" />
      </div>
    </div>
  );
};

export default HeroForm;
