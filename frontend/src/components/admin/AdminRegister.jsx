import React, { useState } from "react";
import { useMutation } from "react-query";
import adminRegister from "../../services/adminRegister";
import FormSuccess from "../FormSuccess";

const AdminRegister = ({ setShowRegister }) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("educator");
  const [profileDescription, setProfileDescription] = useState("");
  const [profileImageLink, setProfileImageLink] = useState("");
  const [socialLink, setSocialLink] = useState("");


  function resetAllFields(){
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRole("educator");
    setProfileDescription("");
    setProfileImageLink("");
    setSocialLink("");
  }

  const mutation = useMutation(adminRegister, {
    onSuccess : (data) => {
      resetAllFields();
      setTimeout(() => {
        window.location.reload();
      }, 1500)
      console.log(data);
    },
    onError : (error) => {
      console.log(error);
    }
  })


  function handleRegister(e){
    e.preventDefault();
    if (password == confirmPassword){
      mutation.mutate({username, password, email, role, description : profileDescription, profileImageLink, socialLink});
    }
    else {
      console.log("Confirm password not correct")
    }

  }

  return (
    <div className="flex justify-center items-center h-full p-4 md:p-10 bg-base-200">
      <div className="w-full relative max-w-3xl p-8 bg-base-100 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-neutral-content">
          Admin Register
        </h2>


        {mutation.isSuccess && 
          <FormSuccess/>
        }

        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username */}
            <div>
              <label
                className="block text-sm font-medium mb-2 text-neutral-content"
                htmlFor="username"
              >
                Username
              </label>
              <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
                type="text"
                name="username"
                id="username"
                className="input input-bordered w-full"
                placeholder="Enter your username"
              />
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-sm font-medium mb-2 text-neutral-content"
                htmlFor="email"
              >
                Email
              </label>
              <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-sm font-medium mb-2 text-neutral-content"
                htmlFor="password"
              >
                Password
              </label>
              <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                className="input input-bordered w-full"
                placeholder="Enter your password"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                className="block text-sm font-medium mb-2 text-neutral-content"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                name="confirm-password"
                id="confirm-password"
                className="input input-bordered w-full"
                placeholder="Confirm your password"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2 text-neutral-content"
                htmlFor="imageLink"
              >
                Profile Image Link
              </label>
              <input
              value={profileImageLink}
              onChange={(e) => setProfileImageLink(e.target.value)}
                type="text"
                name="imageLink"
                id="imageLink"
                className="input input-bordered w-full"
                placeholder="Enter a link to your profile image"
              />
            </div>

            {/* Profile Description */}
            <div className="md:col-span-2">
              <label
                className="block text-sm font-medium mb-2 text-neutral-content"
                htmlFor="profileDescription"
              >
                Profile Description
              </label>
              <textarea
              value={profileDescription}
              onChange={(e) => setProfileDescription(e.target.value)}
                name="profileDescription"
                id="profileDescription"
                className="textarea textarea-bordered w-full"
                placeholder="Tell us about yourself"
              ></textarea>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2 text-neutral-content"
                htmlFor="role"
              >
                Role (e.g., Software Developer)
              </label>
              <select className="select select-bordered w-full max-w-xs"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              >
                <option value="educator">Course Educator</option>
                <option value="student">Student</option>
                <option value="content-manager">Content Manager</option>
                <option value="marketing-specialist">
                  Marketing Specialist
                </option>
                <option value="seo-specialist">SEO Specialist</option>
                <option value="sales-manager">Sales Manager</option>
                <option value="support-agent">Support Agent</option>
                <option value="product-manager">Product Manager</option>
                <option value="designer">Designer</option>
                <option value="developer">Developer</option>
                <option value="qa-tester">QA Tester</option>
                <option value="copywriter">Copywriter</option>
                <option value="data-analyst">Data Analyst</option>
                <option value="hr-manager">HR Manager</option>
                <option value="project-manager">Project Manager</option>
                <option value="legal-advisor">Legal Advisor</option>
              </select>
            </div>

            {/* Social Link */}
            <div>
              <label
                className="block text-sm font-medium mb-2 text-neutral-content"
                htmlFor="socialLink"
              >
                Social Link
              </label>
              <input
                type="text"
                name="socialLink"
                id="socialLink"
                value={socialLink}
                onChange={(e) => setSocialLink(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter a link to your social profile"
              />
            </div>
          </div>

          {mutation.isError && (
            <p className="text-red-500">{mutation.error.response.data.error}</p>
          )}

          {/* Submit Button */}
          <div className="grid md:grid-cols-2 gap-4">
          <button type="reset" onClick={() => resetAllFields()} className="btn btn-error mt-6">
            Clear
          </button>
          <button onClick={handleRegister} type="submit" className="btn btn-primary mt-6">
            {mutation.isLoading ? "Registering.." : "Register"}
          </button>
          </div>
          
        </form>

        {/* Switch to login */}
        <p className="mt-4 text-center text-sm text-neutral-content">
          Already have an account?{" "}
          <a className="text-primary" onClick={() => setShowRegister(false)}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminRegister;
