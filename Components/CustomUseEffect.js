import React, { useEffect, useRef } from "react";

export default function updateUseEffect(effect, dep = []) {
	let initialValue = useRef(true);

	useEffect(() => {
		if (initialValue.current) {
			initialValue.current = false;
		} else {
			return effect();
		}
	}, dep);
}
