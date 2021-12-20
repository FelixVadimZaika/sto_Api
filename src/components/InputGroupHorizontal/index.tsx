type AppProps = {
    label: string
    field: string
    type?: "text" | "email" | "password"
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
};

const InputGroupHorizontal = ({ label, field, onChange, type = "text" }: AppProps) => {
    return (
        <>
            <div className="row py-1">
                <label htmlFor={field} className="col-3 col-form-label">
                    {label}
                </label>
                <div className="col-9">
                    <input
                        type={type}
                        name={field}
                        className="form-control"
                        id={field}
                        onChange={onChange}
                    />
                </div>
            </div>
        </>
    );
}


export default InputGroupHorizontal;