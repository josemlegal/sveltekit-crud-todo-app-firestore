<script>
  // @ts-nocheck

  import {
    addDoc,
    collection,
    onSnapshot,
    doc,
    deleteDoc,
    updateDoc,
  } from "firebase/firestore";
  import { onDestroy } from "svelte";
  import { db } from "./firebase";

  let task = {
    title: "",
    description: "",
  };

  let tasks = [];
  let editStatus = false;
  let currentId = "";

  const addTask = async () => {
    try {
      await addDoc(collection(db, "tasks2"), task);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async () => {
    try {
      await updateDoc(doc(db, "tasks2", currentId), task);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!editStatus) {
        addTask();
      } else {
        updateTask();
      }
    } catch (error) {
      console.log(error);
    }
    task = {
      title: "",
      description: "",
    };

    editStatus = false;
    currentId = "";
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks2", id));
    } catch (error) {
      console.error(error);
    }
  };

  const editTask = (currentTask) => {
    task.title = currentTask.title;
    task.description = currentTask.description;
    currentId = currentTask.id;
    editStatus = true;
  };

  const unSub = onSnapshot(
    collection(db, "tasks2"),
    (QuerySnapshot) => {
      tasks = QuerySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      console.log(tasks);
    },
    (err) => {
      console.log(err);
    }
  );

  onDestroy(() => {
    unSub();
  });
</script>

<main>
  <!-- {JSON.stringify(tasks)} -->
  <div class="bg-white">
    <div class="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <h2
        class="inline text-3xl font-bold tracking-tight text-gray-900 sm:block sm:text-4xl"
      >
        TO-DO APP
      </h2>
      <p
        class="inline text-3xl font-bold tracking-tight text-indigo-600 sm:block sm:text-4xl"
      >
        SVELTE CRUD + FIREBASE
      </p>
      <div class="">
        <form on:submit|preventDefault={handleSubmit} class="p-4 mt-4 sm:flex">
          <label for="title" class="text-sm font-semibold text-gray-900"
            >Tarea</label
          >

          <input
            bind:value={task.title}
            type="text"
            required
            placeholder=""
            class="w-full rounded-md border-gray-300 px-5 py-3 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs"
          />
          <label
            for="description"
            class="text-sm font-semibold text-gray-900
          ">Descripcion</label
          >
          <input
            bind:value={task.description}
            id="description"
            required
            rows="3"
            placeholder=""
            class="w-full rounded-md border-gray-300 px-5 py-3 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs"
          />
          <div class="relative">
            <div
              class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                /></svg
              >
            </div>
            <input
              datepicker
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date"
            />
          </div>
          <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
            <button
              type="submit"
              class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >Guardar</button
            >
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Pendientes</h1>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none" />
    </div>
    <div class="mt-2 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div
            class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >Status</th
                  >
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >Tarea</th
                  >
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >Descripcion</th
                  >
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >Deadline</th
                  >
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >Acciones</th
                  >
                </tr>
              </thead>
              {#each tasks as task}
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                      >Checkbox</td
                    >
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                      >{task.title}</td
                    >
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      >{task.description}</td
                    >
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      >Fecha</td
                    >

                    <td
                      class="relative whitespace-nowrap py-4 pl-3 text-right text-sm font-medium sm:pr-6"
                    >
                      <div class="flex ">
                        <button
                          on:click={deleteTask(task.id)}
                          class="flex w-24 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
                          >Eliminar</button
                        >
                        <button
                          on:click={editTask(task)}
                          class="flex w-24 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >Editar</button
                        >
                      </div>
                    </td>
                  </tr>
                </tbody>
              {/each}
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
</style>
