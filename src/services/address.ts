interface Address {
  city: string;
  neighborhood: string;
  state: string;
  street: string;
}

const getAddressByCep = async (cep: string): Promise<Address | null> => {
  const formattedCep = cep.replace(/\D/g, '');
  console.log('formattedCep', formattedCep);
  try {
    const response = await fetch(
      `https://viacep.com.br/ws/${formattedCep}/json/`,
    );
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (data.erro) {
      return null;
    }

    const address: Address = {
      city: data.localidade,
      neighborhood: data.bairro,
      state: data.estado,
      street: data.logradouro,
    };

    return address;
  } catch (error: Error | any) {
    console.error('Error fetching address:', error.message);
    return null;
  }
};

export default getAddressByCep;
