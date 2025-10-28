const dadosOntem = async () => {
    const ontem = '2025-07-14';

    try{

        const response = await fetch(`http://localhost:8000/dados/diario/data/${ontem}`)
        return await response.json();
    }
    catch(e){
        return e;
    }
}

export default dadosOntem;