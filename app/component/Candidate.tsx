interface CandProps {
  children: React.ReactNode;
}

const Candidate = ({ children }: CandProps) => {
  return <li>{children}</li>;
};
export default Candidate;
