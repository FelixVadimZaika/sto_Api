import { useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const ProductsListPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { products } = useTypedSelector((store) => store.product);
    const { fetchProducts } = useActions();
    useEffect(() => {
        async function getProducts() {
            setLoading(true);
            try {
                await fetchProducts();
                setLoading(false);
            } catch (ex) {
                setLoading(false);
            }
        }
        getProducts();
    }, []);

    return (
        <>
            <h1 className="text-center">Product </h1>
            {loading && <h2>Loading ...</h2>}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => {
                        return (
                            <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.detail}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default ProductsListPage;