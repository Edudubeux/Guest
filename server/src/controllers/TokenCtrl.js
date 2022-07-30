import jwt from 'jsonwebtoken';
import Token from '../services/Token';

class TokenController {
	async generateToken(req, res) {
		try {
			if (!req.data) {
				return res.status(400).json({ error: "REQUIRED_FIELDS" })
			};

			const user = await Token.find(req.data);

			if (!user || !(await user.checkPassword(req.data.password))) {
				return res.status(400).json({ error: "Invalid password or email, try again later." });
			}

			const { id, email } = user;

			const token = jwt.sign({ id, email, }, 'admin', {
				expiresIn: '7d',
			});

			return res.json({ token, });
		} catch (error) {
			res.status(400).json({ error: error.message })
		}
	}
}

export default new TokenController();