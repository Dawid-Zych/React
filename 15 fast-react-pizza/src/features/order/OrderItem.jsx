import { formatCurrency } from '../../utils/helpers';
import PropTypes from 'prop-types';

OrderItem.propTypes = {
	item: PropTypes.object,
	isLoadingIngredients: PropTypes.any,
	ingredients: PropTypes.any,
};

function OrderItem({ item, isLoadingIngredients, ingredients }) {
	const { quantity, name, totalPrice } = item;

	return (
		<li>
			<div>
				<p>
					<span>{quantity}&times;</span> {name}
				</p>
				<p>{formatCurrency(totalPrice)}</p>
			</div>
		</li>
	);
}

export default OrderItem;
