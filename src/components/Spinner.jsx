import { BarLoader } from "react-spinners";

export default function Spinner({ color = 'blue', size = '120' }) {

    const override = {
        display: 'block',
        margin: '0 auto 50px auto',
    };

    return (
        <div>
            <BarLoader
                color={color}
                size={size}
                cssOverride={override}
                aria-label="Loading..."
            />
        </div>
    );
};