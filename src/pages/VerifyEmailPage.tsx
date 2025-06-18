import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const VerifyEmailPage: React.FC = () => {
  const [params] = useSearchParams();

  useEffect(() => {
    const code = params.get("code");

    if (code) {
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/verify-email`, { code })
        .then((res) => {
          alert(res.data.message || "Email verified successfully!");
        })
        .catch((err) => {
          console.error(err);
          alert("Verification failed. Invalid or expired link.");
        });
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <h1 className="text-xl font-semibold">Verifying your email...</h1>
    </div>
  );
};

export default VerifyEmailPage;
