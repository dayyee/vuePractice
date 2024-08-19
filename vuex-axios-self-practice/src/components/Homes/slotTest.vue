<template>
  <div>
    <div>어쩌고 저쩌고</div>
    <table>
      <table>
        <tr>
          <td>Hi, I'm your first cell.</td>
          <td>I'm your second cell.</td>
          <td>I'm your third cell.</td>
          <td>I'm your fourth cell.</td>
        </tr>

        <tr>
          <td>Second row, first cell.</td>
          <td>Cell 2.</td>
          <td>Cell 3.</td>
          <td><slot name="varName"></slot></td>
        </tr>
      </table>
    </table>
    <slot name="varName"></slot>
  </div>
</template>
<script></script>

<style>
table {
  border-collapse: collapse;
}
td,
th {
  border: 1px solid black;
  padding: 10px 20px;
}
</style>
