import BlogForm from "@/components/BlogForm";
import ProjectForm from "@/components/PorjectForm";
import PromotionForm from "@/components/PromotionForm";
import ProvidersForm from "@/components/ProvidersForm";
import TeamForm from "@/components/TeamForm";

function prueba() {
  return (
    <div>
      <div className="m-5">
        <ProjectForm />
      </div>
      <div className="m-5">
        <TeamForm />
      </div>
      <div className="m-5">
        <PromotionForm />
      </div>
      <div className="m-5">
        <BlogForm />
      </div>
      <div className="m-5">
        <ProvidersForm />
      </div>
    </div>
  );
}

export default prueba;
