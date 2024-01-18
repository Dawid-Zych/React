import { formatCurrency } from '../../utils/helpers';
import PropTypes from 'prop-types';

MenuItem.propTypes = {
	pizza: PropTypes.object,
};

function MenuItem({ pizza }) {
	const { name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

	return (
		<li>
			<img src={imageUrl} alt={name} />
			<div>
				<p>{name}</p>
				<p>{ingredients.join(', ')}</p>
				<div>{!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}</div>
			</div>
		</li>
	);
}

export default MenuItem;
