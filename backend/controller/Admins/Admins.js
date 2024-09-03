import { ElectionContract, web3 } from "../../web3.js"

export const addNewAdmin = async (req, res) => {
    const { address } = req.body;
    if (!web3.utils.isAddress(address)) {
        return res.status(400).send("Invalid Ethereum Address")
    }
    try {
        const addr = await web3.eth.getAccounts();
        const tx = await ElectionContract.methods.addAdmin(address).send({ from: addr[0], gas: 5000000 })

        const txData = JSON.parse(JSON.stringify(tx, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));
        res.status(201).json({ msg: 'Admin added successfully', txData })

    } catch (error) {
        res.status(500).json({ msg: 'Error adding admin', error: error.message })
    }

}

export const getAllAdmins = async (req, res) => {
    try {
        const tx = await ElectionContract.methods.getAdmins().call();
        res.status(200).json({ tx })
    } catch (error) {
        res.status(500).json({ msg: 'Error retriveing admins', error })
    }
}