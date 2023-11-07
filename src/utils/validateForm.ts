import * as yup from 'yup';

export const CodeValidate = yup.object().shape({
	username: yup.string().trim().required('El email o DNI es requerido'),
});

export const LoginValidate = yup.object().shape({
	username: yup.string().trim().required('El email o DNI es requerido'),
	password: yup.string().trim().required('El codigo es requerido'),
});

export const UserValidate = yup.object().shape({
	username: yup
		.string()
		.length(8, 'El DNI debe tener una longitud de 8 digitos')
		.trim()
		.required('El DNI es requerido'),
	email: yup.string().email('El email no es valido').trim().required('El email es requerido'),
	name: yup.string().required('El nombre es requerido'),
	lastname: yup.string().required('El apellido es requerido'),
	password: yup.string().trim().required('La clave es requerida'),
	role: yup
		.string()
		.oneOf(['USER', 'ADMIN'], 'El rol debe ser USER o ADMIN')
		.required('El rol es requerido'),
});

export const ElectionValidate = yup.object().shape({
	name: yup.string().required('El nombre es requerido'),
	startDate: yup.date().required('La fecha de inicio es requerida'),
	endDate: yup
		.date()
		.required('La fecha de finalizacion es requerida')
		.min(yup.ref('startDate'), 'La fecha de finalizacion debe ser mayor que la de inicio'),
});

export const RoleValidate = yup.object().shape({
	name: yup.string().required('El nombre es requerido'),
	order: yup
		.number()
		.required('El orden es requerido')
		.min(1, 'El orden debe ser mayor o igual a 1'),
	dhondt: yup.boolean(),
});

export const ListValidate = yup.object().shape({
	name: yup.string().required('El nombre es requerido'),
});

export const CandidateValidate = yup.object().shape({
	voter: yup.string().required('El candidato es requerido'),
	role: yup.string().required('El rol es requerido'),
	list: yup.string().required('La lista es requerida'),
});

export const VoteValidate = yup.object().shape({
	election: yup.string().required('La eleccion es requerida'),
	list: yup.string().required('La lista es requerida'),
});
