import { useNavigate } from "react-router-dom";
import Button from "./Button";

function ButtonBack() {
	const navigate = useNavigate();

	function moveBack(event) {
		event.preventDefault();
		navigate(-1);
	}
	return (
		<Button type="back" onClick={moveBack}>
			&larr; Back
		</Button>
	);
}
export default ButtonBack;
