import { EFieldType } from '../shared/components/form-management/enums/field-type.enum';
import { IForm } from '../shared/components/form-management/interfaces/form.interface';

export const clothingForm: IForm = {
	name: 'Amazon Clothing',
	removableFields: false,
	subtitle: 'Click a Field to Edit',
	buttonLabel: 'Save Form',
	buttonDisabled: false,
	mode: 'Write',
	fields: [
		{
			type: EFieldType.TEXT, controlName: 'SKU', placeholder: 'Enter your SKU',
			hintLabel: `Your custom item code/serial`, value: `Allntrends-X44-CM1-8001-P`,
			required: true, min: 10, max: 99
		},
		{
			type: EFieldType.TEXT, controlName: 'Title', placeholder: 'Enter your Title',
			hintLabel: `Your item's title`, value: `Allntrends Women's T Shirt Stranger Xmas Funny Ugly Christmas Shirt`,
			required: true, min: 10, max: 200
		},
		{
			type: EFieldType.TEXT, controlName: 'Brand', placeholder: 'Enter your Brand',
			hintLabel: `Your item's title`, value: `ALLNTRENDS`, disabled: true,
			required: true, min: 10, max: 200
		},
		{
			type: EFieldType.TEXT, controlName: 'Description', placeholder: 'Enter your Description',
			hintLabel: `Your item's title`, value: `Cool Women's T Shirt with the print of Stranger Xmas.  Cute Women's regular fit t shirt made of 50% Cotton, 50% Polyester. high-density fabric, double-needle cover stitched front neck; seamless 1x1 rib collar, shoulder-to-shoulder tape; double-needle stitched bottom. Best Quality Fabric, Soft and Comfortable.  Adult Women's Sizes- For best fit and easy way to choose your perfect size please refer to the picture we've created with the size chart and guide. This high quality product can be washed as you wish and exactly as you always wash your other cloths. From years of experience, we recommend to wash it inside-out with cold water and no dryer for best results. All Sizes and Cool Colors Are Available!`,
			required: true, min: 10, max: 1000
		},
		{
			type: EFieldType.DROPDOWN, controlName: 'Item_Type', placeholder: `Choose your Item-Type`,
			hintLabel: `Category of your item`, hintMessage: `Here's the dropdown arrow ^`, value: `T-Shirt`,
			required: true,
			options: [{ label: `T-Shirt`, value: `T-Shirt` }, { label: `Tank-Top`, value: `Tank-Top` }, { label: `Hoodie`, value: `Hoodie` }, { label: `Sweaters`, value: `Sweaters` }, { label: `Sweatshirts`, value: `Sweatshirts` }]
		},
		{
			type: EFieldType.NUMBER, controlName: 'Price', placeholder: 'Enter your Price',
			hintLabel: 'Range 0 - 99', value: 14.99,
			required: true, min: 0, max: 9999, step: 0.01
		},
		{
			type: EFieldType.NUMBER, controlName: 'Days_Till_Ready', placeholder: 'Enter your Fulfillment',
			hintLabel: 'Days till ready for delivery', value: 3,
			required: true, min: 1, max: 90, step: 1
		},
		{
			type: EFieldType.NUMBER, controlName: 'Quantity', placeholder: 'Enter your Quantity',
			hintLabel: 'Number of items available', value: 100,
			required: true, min: 0, max: 100, step: 1
		},
		{
			type: EFieldType.TEXT, controlName: 'Bullet_Point_1', placeholder: 'Enter your Bullet Point',
			hintLabel: `Point 1 about you or this item`, value: `Double-needle stitching throughout; seamless rib at neck, feminine ½" rib mid scoop neck; side seamed with slightly tapered Missy fit, cap sleeves for comfort, taped shoulder-to-shoulder.  Ash color is 99% cotton, 1% polyester.`,
			required: false, min: 0, max: 1500
		},
		{
			type: EFieldType.TEXT, controlName: 'Bullet_Point_2', placeholder: 'Enter your Bullet Point',
			hintLabel: `Point 2 about you or this item`, value: `Made of 100% preshrunk cotton. The colors Safety Green, Safety Orange, Safety Pink are 50% cotton/ 50% polyester.`,
			required: false, min: 0, max: 1500
		},
		{
			type: EFieldType.TEXT, controlName: 'Bullet_Point_3', placeholder: 'Enter your Bullet Point',
			hintLabel: `Point 3 about you or this item`, value: `Designed and printed in the USA.`,
			required: false, min: 0, max: 1500
		},
		{
			type: EFieldType.TEXT, controlName: 'Bullet_Point_4', placeholder: 'Enter your Bullet Point',
			hintLabel: `Point 4 about you or this item`, value: `Best Quality Fabric, Cozy Soft and Comfortable. This high quality product can be washed as you wish and exactly as you always wash your other cloths. From years of experience, we recommend to wash it inside-out with cold water and no dryer for best results.`,
			required: false, min: 0, max: 1500
		},
		{
			type: EFieldType.TEXT, controlName: 'Bullet_Point_5', placeholder: 'Enter your Bullet Point',
			hintLabel: `Point 5 about you or this item`, value: `Adult Women's Sizes. For best fit and easy way to choose your perfect size please refer to the picture we've created with the size chart and guide. Do not confuse with the size chart Amazon offers-  It's different than ours! If you need any more information or have any concerns or questions, please don't hesitate and contact us. We are always here for you!`,
			required: false, min: 0, max: 1500
		},
		{
			type: EFieldType.TEXT, controlName: 'Bullet_Point_6', placeholder: 'Enter your Bullet Point',
			hintLabel: `Point 6 about you or this item`, value: `Cool print- We are doing the best to offer the best, greatest trending graphics you can wear any place, any time. Each print comes on variety types of clothing to fit any occasion, any weather. We also accept special requests, feel free to contact us if you have something on your mind you want to create. We always think on the next hot graphic so don't forget to check us out from time to time!`,
			required: false, min: 0, max: 1500
		},
		{
			type: EFieldType.TEXT, controlName: 'Bullet_Point_7', placeholder: 'Enter your Bullet Point',
			hintLabel: `Point 7 about you or this item`, value: `***WE CARE about you and want to make sure our hard work will work for you! After selecting your size, make sure "sold by ALLNTRENDS" appears above the "Add to Cart" button. It doesn't? no worries! Just choose our name from the list below the buy box to make sure you will receive the original great product from us. ***`,
			required: false, min: 0, max: 1500
		},
		{
			type: EFieldType.TEXT, controlName: 'Keywords', placeholder: 'Enter your Keywords',
			hintLabel: `Search words customers use to find your item`, value: `Upside Down Shadow Monster Ugly Sweater, Stranger Things Christmas Sweaters, Hawkins Xmas Tshirt, Steve Harrison Shirt, AV Club,  Stranger of Things Fans Holiday Gift, Camp Know Where 85 Tee, Stranger Monster Hoodie, Waffle Top, Roast Beach Cow Tee`,
			required: true, min: 0, max: 500
		},
		{
			type: EFieldType.TEXT, controlName: 'Main_Image', placeholder: 'Enter your Main Image URL',
			hintLabel: `The link to your image`, value: `https://dl.dropboxusercontent.com/s/z3vrytwbxacyc51/irish%20green.png`,
			required: true
		},
		{
			type: EFieldType.TEXT, controlName: 'Image2', placeholder: 'Enter your Second Image URL',
			hintLabel: `The link to your image`, value: `https://dl.dropboxusercontent.com/s/zbiagl80t76hu7p/__Instructions-Women-T-Shirt-5000L.jpg`,
			required: false
		},
		{
			type: EFieldType.TEXT, controlName: 'Image3', placeholder: 'Enter your Third Image URL',
			hintLabel: `The link to your image`, value: `https://dl.dropboxusercontent.com/s/ecvc0k6mbcxvf5s/33423_b_fl.jpg`,
			required: false
		},
		{
			type: EFieldType.TEXT, controlName: 'Image4', placeholder: 'Enter your Fourth Image URL',
			hintLabel: `The link to your image`, value: `https://dl.dropboxusercontent.com/s/zbiagl80t76hu7p/__Instructions-Women-T-Shirt-5000L.jpg`,
			required: false
		},
		{
			type: EFieldType.DROPDOWN, controlName: 'Parent_Child', placeholder: 'Is item Parent or Child',
			hintLabel: `Choose a Parent/Child option`, value: `Parent`,
			required: true,
			options: [{ label: 'Parent', value: 'Parent' }, { label: 'Child', value: 'Child' }]
		},
		{
			type: EFieldType.TEXT, controlName: 'Parent_SKU', placeholder: `Enter your Parent's SKU`,
			hintLabel: `If this is a Child, enter the Parent's SKU`, value: ``,
			required: false, min: 10, max: 99
		},
		{
			type: EFieldType.DROPDOWN, controlName: 'Relationship', placeholder: `Enter your Item's Relationship`,
			hintLabel: `If this is a variation of other item types`, value: ``,
			required: false,
			options: [{ label: '', value: '' }, { label: 'Variation', value: 'Variation' }]
		},
		{
			type: EFieldType.DROPDOWN, controlName: 'Variation_Theme', placeholder: `Choose your Variation's Theme`,
			hintLabel: `The type of this variation (i.e. Sizecolor)`, value: `Sizecolor`,
			required: true,
			options: [{ label: '', value: '' }, { label: 'Sizecolor', value: 'Sizecolor' }]
		},
		{
			type: EFieldType.DROPDOWN, controlName: 'Color', placeholder: `Choose your Color`,
			hintLabel: `Choose this item's color name`, value: ``,
			required: false,
			options: [{ label: 'Green', value: 'Green' }, { label: 'Irish Green', value: 'Irish Green' }, { label: 'Ash', value: 'Ash' }, { label: 'Black', value: 'Black' }, { label: 'Forest Green', value: 'Forest Green' }, { label: 'Navy Blue', value: 'Navy Blue' }, { label: 'Orange', value: 'Orange' }, { label: 'Royal Blue', value: 'Royal Blue' }, { label: 'Sporty Green', value: 'Sporty Green' }, { label: 'Maroon', value: 'Maroon' }, { label: 'Red', value: 'Red' }, { label: 'Safety Orange', value: 'Safety Orange' }, { label: 'Kelly Green', value: 'Kelly Green' }]
		},
		{
			type: EFieldType.DROPDOWN, controlName: 'Color_Map', placeholder: `Choose your Color Map`,
			hintLabel: `Choose this item's color to map for categories`, value: `Green`,
			required: true,
			options: [{ label: 'Green', value: 'Green' }, { label: 'Multicoloured', value: 'Multicoloured' }]
		},
		{
			type: EFieldType.DROPDOWN, controlName: 'Department', placeholder: `Choose your Department`,
			hintLabel: `Department of your item`, value: 'Womens',
			required: true,
			options: [{ label: 'Womens', value: 'Womens' }, { label: 'Mens', value: 'Mens' }, { label: 'Childrens', value: 'Childrens' }, { label: 'Pets', value: 'Pets' }]
		},
		{
			type: EFieldType.DROPDOWN, controlName: 'Fabric_Type', placeholder: `Choose your Fabric Type`,
			hintLabel: `Fabric type of your item`, value: '50% Cotton/50% Polyester',
			required: true,
			options: [{ label: '50% Cotton/50% Polyester', value: '50% Cotton/50% Polyester' }, { label: '100% Cotton', value: '100% Cotton' }, { label: '100% Polyester', value: '100% Polyester' }]
		},
		{
			type: EFieldType.DROPDOWN, controlName: 'Size', placeholder: `Choose your Size`,
			hintLabel: `Size of your item`, value: '',
			required: false,
			options: [{ label: '', value: '' }, { label: 'S', value: 'S' }, { label: 'M', value: 'M' }, { label: 'L', value: 'L' }, { label: 'XL', value: 'XL' }, { label: '2XL', value: '2XL' }, { label: '3XL', value: '3XL' }, { label: '4XL', value: '4XL' }]
		},
		{
			type: EFieldType.DROPDOWN, controlName: 'Size_Map', placeholder: `Choose your Size Map`,
			hintLabel: `Size map of your item`, value: '',
			required: false,
			options: [{ label: '', value: '' }, { label: 'Small', value: 'Small' }, { label: 'Medium', value: 'Medium' }, { label: 'Large', value: 'Large' }, { label: 'X-Large', value: 'X-Large' }, { label: 'XX-Large', value: 'XX-Large' }, { label: 'XXX-Large', value: 'XXX-Large' }, { label: 'XXXX-Large', value: 'XXXX-Large' }]
		},
		{
			type: EFieldType.TEXT, controlName: 'Shipping_Template', placeholder: `Enter your Shipping-Template's name`,
			hintLabel: `If you created a shipping-template`, value: ``,
			required: false, min: 0, max: 100
		},
	]
};
