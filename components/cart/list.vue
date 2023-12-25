<script setup> 
const cart = useCart(); 
</script>

<template>
  <NSpace> 
    <div v-if="!cart.COUNT">&lt; пусто &gt;</div>
    <table v-else class="table table-bordered table-hover">
		<thead>
			<tr>
				<th>Название</th>
				<th>Цена</th>
				<th>Количество</th>
				<th>Сумма</th>
				<th>Действия</th>
			</tr>
		</thead>	
		
		<tbody>
			<tr v-for="pr in cart.getItems" :key="pr.id">
				<td>{{ pr.title.trim() }}</td>
				<td>{{ pr.price }}</td>
				<td>{{ pr.cnt }}</td>
				<td>{{ pr.price * pr.cnt }}</td>
				<td>
					<button v-if="pr.cnt" class="btn btn-warning me-1" @click="cart.setCnt({ id: pr.id, cnt: pr.cnt - 1 })">-1</button>
					<button v-else class="btn btn-danger me-1" @click="cart.remove(pr.id)">Удалить?</button>
					<button class="btn btn-success" @click="cart.setCnt({ id: pr.id, cnt: pr.cnt + 1 })">+1</button>
				</td>
			</tr>
		</tbody>
	</table>
  </NSpace> 
</template>
