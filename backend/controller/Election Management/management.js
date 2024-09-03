import { ElectionContract, web3 } from '../../web3.js'

export const setDetails = async (req, res) => {
    try {
        const { name, description } = req.body;

        const accounts = await web3.eth.getAccounts();
        const tx = await ElectionContract.methods.setElectionDetails(name, description).send({ from: accounts[0], gas: 5000000 })
        const txData = JSON.parse(JSON.stringify(tx, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));
        res.status(200).json(txData)
    } catch (error) {
        res.status(500).send({ message: 'Data not saved', error: error.message })
    }

}

export const getDetails = async (req, res) => {
    try {
        const data = await ElectionContract.methods.getElectionDetails().call();

        res.status(200).json(data)
    } catch (error) {
        res.status(500).send({ message: 'Data not retrieved', error })
    }
}

export const getVotes = async (req, res) => {
    try {
        const tx = await ElectionContract.methods.getVotes().call();
        const txData = JSON.parse(JSON.stringify(tx, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));

        res.status(200).json(txData)
    } catch (error) {
        res.status(500).send({ message: "Couldn't get votes", error })
    }
}

export const endElection = async (req, res) => {
    try {
        const accounts = await web3.eth.getAccounts();
        const tx = await ElectionContract.methods.endElection().send({ from: accounts[0], gas: 5000000 });
        const txData = JSON.parse(JSON.stringify(tx, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));

        res.status(200).json(txData)
    } catch (error) {
        res.status(500).send({ error })
    }
}

export const resetElection = async (req, res) => {
    try {
        const accounts = await web3.eth.getAccounts();
        const tx = await ElectionContract.methods.resetElection().send({ from: accounts[0], gas: 5000000 });
        const txData = JSON.parse(JSON.stringify(tx, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));

        res.status(200).json(txData)
    } catch (error) {
        res.status(500).send({ error })
    }
}

export const getStatus = async (req, res) => {
    try {

        const tx = await ElectionContract.methods.getStatus().call()
        const txData = JSON.parse(JSON.stringify(tx, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));

        res.status(200).json(txData)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}